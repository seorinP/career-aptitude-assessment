import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ko from "yup-locales-ko";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, forwardRef, useRef, useState } from "react";
import api from "utils/api";
import { useHistory } from "react-router-dom";
import { genders } from "utils/constants";

import Landing from '../Landing/index';
import Question from "./Question";
import QuestionList from "./QuestionList";
import ProgressBar from "../../components/ProgressBarComponent";
import StartButton from '../../components/StartButtonComponent';
import FooterComponent from '../../components/FooterComponent';
import PageMoveButton from '../../components/PageMoveButtonComponent';


yup.setLocale(ko);



const Test = () => {
  const history = useHistory();
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  
  const lastPageIndex = useMemo(() => {
    return parseInt((questions || []).length / 5, 10) + 2;
  }, [questions]);

  const [selectedSampleValue, setSelectedSampleValue] = useState(null);

  const isQuestionLoaded = useMemo(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      return true;
    }
    return false;
  }, [questions]);


{/* 여기서 문항을 5개씩 잘라주는구나 */}
  const visibleQuestions = useMemo(() => {
    if (currentPageIndex <= 1) {
      return [];
    }
    return questions.slice(
      (currentPageIndex - 2) * 5,
      (currentPageIndex - 1) * 5
    );
  }, [currentPageIndex, questions]);

  const formSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required(),
      gender: yup
        .string()
        .nullable()
        .oneOf(Object.keys(genders), "성별을 입력해주세요."),
      answers: yup
        .array()
        .of(yup.string().min(1))
        .required()
        .length(questions.length),
      startDtm: yup.number().required(),
    });
  }, [questions]);


  const { register, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      gender: "",
      answers: [],
      startDtm: new Date().getTime(),
    },
  });

  const isNextDisabled = useMemo(() => {
    if (!isQuestionLoaded) {
      return false;
    }
    if (currentPageIndex <= 0) {
      const { gender, name } = watch();
      return !(name && gender);
    }
    const answers = watch("answers");

    if (!Array.isArray(answers) || !Array.isArray(visibleQuestions)) {
      return false;
    }

    return (
      visibleQuestions.filter(({ qitemNo }) => {
        return !answers[qitemNo - 1];
      }).length > 0
    );
  }, [currentPageIndex, isQuestionLoaded, visibleQuestions, watch]);

  const onSubmit = useCallback(
    async (data) => {
      const { name, gender, startDtm } = data;
      const answers = data?.answers
        ?.sort((a, b) => {
          return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
        })
        ?.map((answer, index) => {
          return `B${index + 1}=${answer}`;
        })
        .join(" ");
      const res = await api.test.submit({ name, gender, startDtm, answers });
      if (res?.url) {
        const seq = (res.url + "").split("seq=").pop();
        if (seq) {
          history.push(`/completed/${seq}`);
        }
      }
      console.log(res);
    },
    [history]
  );

  const handlePrevClick = useCallback(() => {
    setCurrentPageIndex((current) => {
      return current <= 0 ? 0 : current - 1;
    });
  }, []);

  const handleNextClick = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    setCurrentPageIndex((current) => {
      return current >= lastPageIndex ? lastPageIndex : current + 1;
    });
  }, [lastPageIndex, isNextDisabled]);

  const fetchQuestions = useCallback(async () => {
    const res = await api.test.getQuestions();
    if (Array.isArray(res)) {
      setQuestions(res);
    }
  }, []);

  const progressPercentage = useMemo(() => {
    const answers = watch("answers");
    if (Array.isArray(answers) && answers.length > 0) {
      return parseInt(
        (answers.filter((answer) => {
          return !!answer;
        }).length /
          answers.length) *
          100,
        10
      );
    }
    return 0;
  }, [watch]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (currentPageIndex <= 0) {
      setSelectedSampleValue(null);
    }
  }, [currentPageIndex]);

  return (
    <div className="container">
      <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
        
        <Landing 
          ref={register} 
          pageIndex={currentPageIndex} 
          errors={errors} 
          disabled={isNextDisabled} 
          onClick={handleNextClick} />

        
        {/* 페이지가 0부터 시작하는데 위 페이지가 랜딩페이지 다음부터는 검사 예시 페이지 */}
        {currentPageIndex === 1 && (
          <div>
            <div className="mb-4">
              <div className="row justify-content-between">
                <div className="col col-auto">
                  <h2>검사 예시</h2>
                </div>
                <div className="col col-auto">
                  <h3>{progressPercentage}%</h3>
                </div>
              </div>

              <ProgressBar percentage={progressPercentage} />

            </div>
            <h4 className="mb-4">
              직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
              표시하세요.
            </h4>


            {/* Question.js 컴포넌트. 속성 forwardRef로 전달 */}
            {/* 검사 예시 페이지용 문제 */}
            <Question
              qitemNo={999}
              question="두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요."
              answer01="창의성"
              answer02="안정성"
              answerScore01={-1}
              answerScore02={-2}
              initialValue={selectedSampleValue}
              onChange={(qitemNo, answerScore) => {
                setSelectedSampleValue(answerScore);
              }}
            />


            <div className="text-center">
              {/* 이전 다음 버튼 */}
              <PageMoveButton type={'previous'} text={'이전'} onClick={handlePrevClick} />
              &nbsp;
              <StartButton type={'button'} disabled={!selectedSampleValue} text={'검사 시작'} onClick={handleNextClick} />
            </div>


          </div>
        )}

        {/* 본격적으로 검사 시작 */}
        {currentPageIndex > 1 && (
          <div className="mb-4">
            <div className="row justify-content-between">
              {/* 여긴 Logo가 든 Header를 넣자. Home으로 돌아가기 */}
              {/* 검사 진행에 스타일 입히기 */}
              <div className="col col-auto">
                <h2>검사 진행</h2>
              </div>
              <div className="col col-auto">
                <h3>{progressPercentage}%</h3>
              </div>
            </div>
            <ProgressBar percentage={progressPercentage} />
          </div>
        )}

        {/*여기서 question들을 선택지와 함께 불러오는 듯*/}

        <QuestionList questions={questions} visibleQuestions={visibleQuestions} ref={register} />


        {/* 아래 버튼들 */}
        {currentPageIndex > 1 && (
        <>
          <div className="d-flex justify-content-between">

          <PageMoveButton type={'previous'} disabled={currentPageIndex <= 0} text={'이전'} onClick={handlePrevClick} />
  
          <PageMoveButton 
            type={currentPageIndex >= lastPageIndex ? "submit" : "button"} 
            disabled={currentPageIndex <= 0} 
            text={currentPageIndex === lastPageIndex ? "제출" : "다음"}
            onClick={handleNextClick}>
          </PageMoveButton>

          </div>
        </>
        )}

        {/* 여기 footer 넣으면 되겠다 */}
        <FooterComponent />

      </form>
    </div>
  
  );
};

export default forwardRef(Test);
