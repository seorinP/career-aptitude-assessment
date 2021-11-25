import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "utils/api";
import { genders, majorNames, educationLevelNames } from "utils/constants";
import Chart from "./Chart";

const Result = () => {
  const { seq: reportSeq } = useParams();
  const [report, setReport] = useState({});
  const isReportLoaded = useMemo(() => {
    return report && report?.user && report?.inspct && report?.result;
  }, [report]);


  const [majors, setMajors] = useState(null);
  const [jobs, setJobs] = useState(null);

  const reportScores = useMemo(() => {
    if (report?.result?.wonScore) {
      const scores = (report.result.wonScore + "")
        .split(" ")
        .filter((value) => {
          return !!value;
        })
        .map((value) => {
          const [seq, score] = value
            .split("=")
            .map((text) => parseInt(text, 10));
          return { seq, score };
        });
      return scores;
    }
    return [];
  }, [report]);

  const sortedReportScores = useMemo(() => {
    if (Array.isArray(reportScores)) {
      return [...reportScores].sort((a, b) => {
        return a.score < b.score ? 1 : -1;
      });
    }
    return [];
  }, [reportScores]);

  const {
    name: userName,
    gender: userGender,
    date: reportedDate,
  } = useMemo(() => {
    if (isReportLoaded) {
      const { name } = report?.user;
      const {
        registDt: registrationDateString,
        sexdstn: genderSeq,
      } = report?.inspct;

      return {
        name,
        date: new Date(registrationDateString).toLocaleDateString(),
        gender: genders[genderSeq],
      };
    }
    return {};
  }, [isReportLoaded, report]);

  const fetchReport = useCallback(async () => {
    setReport({});
    const res = await api.result.getReport({ seq: reportSeq });
    if (res) {
      setReport(res);
    }
  }, [reportSeq]);


  const fetchMajors = useCallback(async () => {
    if (Array.isArray(sortedReportScores) && sortedReportScores.length > 2) {
      const [{ seq: no1 }, { seq: no2 }] = sortedReportScores;
      if (no1 && no2) {
        const res = await api.result.getMajors({
          no1: no1,
          no2: no2,
        });
        if (res) {
          setMajors(res);
        }
      }
    }
  }, [sortedReportScores]);

  const fetchJobs = useCallback(async () => {
    if (Array.isArray(sortedReportScores) && sortedReportScores.length > 2) {
      const [{ seq: no1 }, { seq: no2 }] = sortedReportScores;
      if (no1 && no2) {
        const res = await api.result.getJobs({
          no1: no1,
          no2: no2,
        });
        if (res) {
          setJobs(res);
        }
      }
    }
  }, [sortedReportScores]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    fetchMajors();
  }, [fetchMajors]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h2 className="border-bottom d-inline-block">직업가치관검사 결과표</h2>
      </div>
      <div className="mb-4">
        직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과
        신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의
        역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때
        상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이
        가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
        기회를 제공합니다.
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">성별</th>
            <th scope="col">검사일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userName}</td>
            <td>{userGender}</td>
            <td>{reportedDate}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <div>
        <h3>직업가치관결과</h3>
        <Chart data={reportScores} />
      </div>
      <br />
      <br />
      <div>
        <h3>가치관과 관련이 높은 직업</h3>
        <div className="bg-secondary p-2 text-center text-white">
          <h4>종사자 평균 학력별</h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap", minWidth: 120 }}>
                분야
              </th>
              <th scope="col">직업</th>
            </tr>
            {educationLevelNames.map(
              (educationLevelName, educationLevelIndex) => {
                const jobsByEducationLevel = (jobs || []).filter((job) => {
                  return job?.[2] === educationLevelIndex + 1;
                });
                return (
                  <tr
                    style={
                      jobsByEducationLevel.length <= 0
                        ? { display: "none" }
                        : {}
                    }
                  >
                    <td
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {educationLevelName}
                    </td>
                    <td>
                      {jobsByEducationLevel.map((job) => {
                        const [jobSeq, jobName] = job;
                        return (
                          <a
                            className="mr-2"
                            href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${jobSeq}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {jobName}
                          </a>
                        );
                      })}
                    </td>
                  </tr>
                );
              }
            )}
          </thead>
        </table>
        <div className="bg-secondary p-2 text-center text-white">
          <h4>종사자 평균 전공별</h4>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap", minWidth: 120 }}>
                분야
              </th>
              <th scope="col">직업</th>
            </tr>
            {majorNames.map((majorName, majorNameIndex) => {
              const jobsByMajor = (majors || []).filter((job) => {
                return job?.[2] === majorNameIndex + 1;
              });
              return (
                <tr style={jobsByMajor.length <= 0 ? { display: "none" } : {}}>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {majorName}
                  </td>
                  <td>
                    {jobsByMajor.map((job) => {
                      const [jobSeq, jobName] = job;
                      return (
                        <a
                          className="mr-2"
                          href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${jobSeq}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {jobName}
                        </a>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
      <div className="text-center">
        <Link className="btn btn-outline-primary" to="/">
          다시 검사하기
        </Link>
      </div>
    </div>
  );
};

export default Result;
