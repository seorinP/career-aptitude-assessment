import Question from "./Question";
import { useMemo, useEffect, useState, useMemo } from "react";


function QuestionList() {
    const [questions, setQuestions] = useState([]);

    const lastPageIndex = useMemo(() => {
        return parseInt((questions || []).length / 5, 10) + 2;
    }, [questions]);

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
    
    const fetchQuestions = useCallback(async () => {
        const res = await api.test.getQuestions();
        if (Array.isArray(res)) {
          setQuestions(res);
        }
      }, []);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);
    
    return (
        <>
            {/* 검사 예시용 문제. Question.js 컴포넌트. 속성 forwardRef로 전달 */}
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
        </>

    );

}
