import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "utils/api";
import { genders, majorNames, educationLevelNames } from "utils/constants";
import Chart from "./Chart";
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import styled from "styled-components";

const Wrapper = styled.div`
  background:linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
  height: 100%;
  width: 100%;
  padding-top: 0px;
`
const Title = styled.div`
  font-family:'Binggrae-Bold';
  font-size:2.5rem;
  text-align:center;
  color:#ed6ea0;
  margin-bottom:5.0rem;
  text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white, 0 -2.5px white;
`
const Description = styled.div`
  font-family:'Binggrae';
  font-size:1.0rem;
  font-weight:400;
  text-align:left;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.25);
  color:#451919;
  margin-bottom:4rem;
`
const Label = styled.div`
    font-family:'Binggrae-Bold';
    text-shadow: -2.5px 0 #ed6ea0, 0 2.5px #ed6ea0, 2.5px 0 #ed6ea0, 0 -2.5px #ed6ea0;
    text-align: left;
    font-size: 1.5rem;
    color: white;
    margin-top: 1.2rem;
    margin-bottom: 1.5rem;
`

const Button = styled.button`
    width: 12.2rem;
    height: 4.8rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
    cursor:pointer;
    display: flex;
    font-family:'Binggrae-Bold';
    color:white;
    justify-content:center;
    align-items:center;
    font-weight: 400;
    font-size:1.35rem;
    text-align:center;
    border:none;
    margin: 0 auto;

    :hover{
      border:5px solid white;
      color:white;
  } 
`


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
    <Wrapper>
      <Header />
    <div className="container">
      <div className="text-center mb-4">
        <Title>" 직업가치관검사 결과표 "</Title>
      </div>
      <Description>
        &nbsp;'직업가치관' 이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다.
        따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의
        역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때
        상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이
        가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
        기회를 제공합니다.
      </Description>

      <table className="table" style={{borderRadius:'35px 10px', backgroundColor:'white', fontFamily:'Binggrae-Bold', textAlign:'center'}}>
        <thead>
          <tr>
            <th style={{color:'#451919', borderColor:'pink'}}>이름</th>
            <th style={{color:'#451919', borderColor:'pink'}}>성별</th>
            <th style={{color:'#451919', borderColor:'pink'}}>검사일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{color:'#451919'}}>{userName}</td>
            <td style={{color:'#451919'}}>{userGender}</td>
            <td style={{color:'#451919'}}>{reportedDate}</td>
          </tr>
        </tbody>
      </table>
      
      <br />
      <br />

      <div>
        <Label>직업가치관결과</Label>
        <Chart data={reportScores} />
      </div>

      <br /><br /><br />
      
      <div>
        <Label>가치관과 관련이 높은 직업</Label>
        <br />
        <div className="p-2 text-center text-black"  style={{color:'#451919', borderRadius:'15px 15px 0px 0px', backgroundColor:'white', fontFamily:'Binggrae-Bold'}}>
          <h4>종사자 평균 학력별</h4>
        </div>
        <table className="table" style={{fontFamily:'Binggrae-Bold'}}>
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

        <br /><br />

        <div className="p-2 text-center text-black" style={{color:'#451919', borderRadius:'15px 15px 0px 0px', backgroundColor:'white', fontFamily:'Binggrae-Bold'}}>
          <h4>종사자 평균 전공별</h4>
        </div>
        <table className="table" style={{fontFamily:'Binggrae-Bold'}}>
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

      <br /><br /><br />

      {/* <div className="text-center" style={{fontFamily:'Binggrae'}}> */}
      <Button>
        <Link to="/" style={{color:'white'}}>
          다시 검사하기
        </Link>
      </Button>
      {/* </div> */}

    </div>
    <FooterComponent />
    </Wrapper>

  );
};

export default Result;
