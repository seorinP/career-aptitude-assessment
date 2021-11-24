import React from "react";
import Question from "./Question";


const QuestionList = React.forwardRef((props, ref) =>  {
  return (
    props.questions.map(
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
              !props.visibleQuestions.find((visibleQuestion) => {
                return visibleQuestion.qitemNo === qitemNo;
              })
            }
            ref={ref}
            qitemNo={qitemNo}
            question={question}
            answer01={answer01}
            answer02={answer02}
            answerScore01={answerScore01}
            answerScore02={answerScore02}
          />
        );
      }
    )
  );
})

export default QuestionList;
