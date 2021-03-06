import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ko from "yup-locales-ko";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, forwardRef, useRef, useState } from "react";
import api from "utils/api";
import { useHistory } from "react-router-dom";
import { genders } from "utils/constants";
import styled from 'styled-components';

import Landing from '../Landing/index';
import TestExample from '../TestExample/index'
import QuestionList from "./QuestionList";
import ProgressBar from "../../components/ProgressBarComponent";
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import PageMoveButton from '../../components/PageMoveButtonComponent';

yup.setLocale(ko);


const Boundary = styled.div `
  margin: 4.0rem 4.8rem;
  height: 100%;
`


const Wrapper = styled.div`
  background: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
  
  height: 100%;
  width: 100%;
  padding-top: 0px;
`
const Title = styled.div`
    font-family:'Binggrae-Bold';
    font-size:1.5rem;
    text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white, 0 -2.5px white;
    text-align:center;
    color:#ed6ea0;
    margin-bottom:3rem;
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
        .oneOf(Object.keys(genders), "????????? ??????????????????."),
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

  const watchUserName = watch("name");
  const watchUserGender = watch("gender");


  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);


  useEffect(() => {
    if (currentPageIndex <= 0) {
      setSelectedSampleValue(null);
    }
  }, [currentPageIndex]);

  return (
    <>
    <Wrapper>
    {/* <div className="container"> */}
      <Header />
      
      <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Landing 
          name={watchUserName}
          gender={watchUserGender}
          ref={register} 
          pageIndex={currentPageIndex} 
          errors={errors} 
          disabled={isNextDisabled} 
          onClick={handleNextClick} />

        {currentPageIndex === 1 && (
          <TestExample 
            setSelectedValue={setSelectedSampleValue}
            initialValue={selectedSampleValue} // ????????? null?????? ????????????.
            disabled={!selectedSampleValue} // disabled true??? ?????????????
            pageIndex={currentPageIndex} 
            progressPercentage={0}
            onClick1={handlePrevClick}
            onClick2={handleNextClick}
          />
        )}

        <Boundary>
        {/* ??????????????? ?????? ?????? */}
        {currentPageIndex > 1 && (
          <>
          <div className="mb-4">
            <ProgressBar text={'?????? ??????'} percentage={progressPercentage} />
          </div>

          <Title>
          "  ?????? ???????????? ????????? ????????? ??? ?????? ?????? ?????????  " <br/> ???????????? ??? ????????? ?????????
          ???????????????.
        </Title>
        </>
        )}
        

        <QuestionList questions={questions} visibleQuestions={visibleQuestions} ref={register} />
        
        {/* ?????? ????????? */}
        {currentPageIndex > 1 && (
        <>
          <div className="button d-flex justify-content-between">

          <PageMoveButton className='button' type={'previous'} disabled={currentPageIndex <= 0} text={'??????'} onClick={handlePrevClick} />
  
          <PageMoveButton 
            className='button'
            type={currentPageIndex >= lastPageIndex ? "submit" : "button"} 
            disabled={currentPageIndex <= 0} 
            text={currentPageIndex === lastPageIndex ? "??????" : "??????"}
            onClick={handleNextClick}>
          </PageMoveButton>

          </div>
        </>
        )}
        </Boundary>
        
      </form>
      <FooterComponent />
    {/* </div> */}
    </Wrapper>
    </>
  );
};

export default forwardRef(Test);
