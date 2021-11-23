import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ko from "yup-locales-ko";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, forwardRef, useRef, useState } from "react";
import api from "utils/api";
import { useHistory } from "react-router-dom";
import { genders } from "utils/constants";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import styled from 'styled-components';
import Whale from '../../assets/common/whale.png';
import GenderRadioButtonComponent from '../../components/GenderRadioButtonComponent';
import StartButtonComponent from '../../components/StartButtonComponent';
// import InputComponent from '../../components/InputComponent';

yup.setLocale(ko);

const Wrapper = styled.div`
    display:${props => props.pageIndex === 0 ? 'flex' : 'none'};
    width:100%;
    background-color:white;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Container = styled.div`
    margin-top:5rem;
    margin-bottom:5rem;
    text-align:center;
`

const Intro = styled.div`
    font-family:'Spoqa-Han-Sans';
    font-size:1.4rem;
    font-weight:400;
    text-align:center;
    color:#A7A7A7;
    margin-bottom:4rem;
`

const InputField = styled.input`
    width: 100%;
    border: 1px solid #6B3FA0;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`

const Title = styled.div`
    font-family:'Jalnan';
    font-size:2.5rem;
    text-align:center;
    color:#6B3FA0;
    margin-top:1.9rem;
    margin-bottom:6.4rem;
`
const FormContainer = styled.div`
    & + & {
        margin-top: 1rem;
    }
`

const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    color: ##6B3FA0;
    margin-top: 1.2rem;
    margin-bottom: 0.25rem;
`

const Logo = styled.img`
    width: 1.2rem;
`

const Footer = styled.div`
    font-family:'Spoqa-Han-Sans';
    font-size:1.4rem;
    font-weight:400;
    text-align:center;
    margin-top:8.9rem;
    color:#A7A7A7;
`


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
        <input ref={register} type="hidden" name="startDtm" />
        <Wrapper pageIndex={currentPageIndex}>
          <Container>
              <Intro>내 가치관에 맞는 찰떡 직업은 무엇일까?<br /> 내게 딱 맞는 직업 찾기 테스트</Intro>

              {/* 제목 작성 */}
              <Title>Find My Fit Job</Title>

              {/* 이름 작성 */}
              <FormContainer>
                  <Label>이름</Label>

                  {/* <InputField type='text' name='username' value={username} placeholder='ex) 김영희, Jasmine 등' onChange={onChangeField} /> */}

                  {/* <InputComponent errors={errors}  ref={register} /> */}

                  <InputField
                    type='text'
                    ref={register}
                    name="name"
                    className={[
                      "form-control",
                      errors?.name && "is-invalid",
                    ].join(" ")}
                    placeholder='ex) 김영희, Jasmine 등'
                  />
                  <div className="invalid-feedback">
                    {errors?.name?.message}
                  </div>

                  {/* <input
                    ref={register}
                    name="name"
                    type="text"
                    className={[
                      "form-control",
                      errors?.name && "is-invalid",
                    ].join(" ")}
                  />
                  <div className="invalid-feedback">
                    {errors?.name?.message}
                  </div> */}

              </FormContainer>

              {/* 성별 선택 */}
              <FormContainer>
                <Label>성별</Label>
                <GenderRadioButtonComponent ref={register} />
              </FormContainer>

              {/* 시작화면 버튼 */}
              <StartButtonComponent type={'button'} disabled={isNextDisabled} text={'내 직업 알아보기'} onclick={handleNextClick} />
            
              <Footer>made by Jasmine &nbsp;<Logo src={Whale} /></Footer>

          </Container>
        </Wrapper>


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
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handlePrevClick}
              >
                이전
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={!selectedSampleValue}
                onClick={handleNextClick}
              >
                검사 시작
              </button>
            </div>
          </div>
        )}

        {/* 본격적으로 검사 시작 */}
        {currentPageIndex > 1 && (
          <div className="mb-4">
            <div className="row justify-content-between">
              {/* 여긴 Logo가 든 Header를 넣자. Home으로 돌아가기 */}
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
        {questions.map(
          ({
            question,
            answer01,
            answer02,
            answerScore01,
            answerScore02,
            qitemNo,
          }) => {
            return (
              <Question
                invisible={
                  !visibleQuestions.find((visibleQuestion) => {
                    return visibleQuestion.qitemNo === qitemNo;
                  })
                }
                ref={register}
                qitemNo={qitemNo}
                question={question}
                answer01={answer01}
                answer02={answer02}
                answerScore01={answerScore01}
                answerScore02={answerScore02}
              />
            );
          }
        )}

        {/* 아래 버튼들 */}
        {currentPageIndex > 1 && (
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePrevClick}
              disabled={currentPageIndex <= 0}
            >
              &lt; 이전
            </button>
            <button
              type={currentPageIndex >= lastPageIndex ? "submit" : "button"}
              className="btn btn-primary"
              onClick={handleNextClick}
              disabled={isNextDisabled}
            >
              {currentPageIndex === lastPageIndex ? "제출" : "다음"} &gt;
            </button>
          </div>
        )}

        {/* 여기 footer 넣으면 되겠다 */}

      </form>
    </div>
  );
};

export default forwardRef(Test);
