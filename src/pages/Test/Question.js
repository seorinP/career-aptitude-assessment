import { forwardRef } from "react";
import styled from "styled-components";

const QuestionText = styled.div`
    font-family:'Binggrae';
    text-align: center;
    font-size: 1.3rem;
    color: ##6B3FA0;
    margin-bottom: 1.2rem;
`
const Container = styled.div`
  margin-left:2rem;
  margin-right:2rem;
  background-color: pink;
  padding: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const Content = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Question = forwardRef(
  (
    {
      invisible,
      qitemNo,
      question,
      answer01,
      answer02,
      answerScore01,
      answerScore02,
      onChange: handleChange,
      initialValue,
    },
    ref
  ) => {
    return (
      <div
        className="form-group"
        style={{
          display: invisible ? "none" : "block",
        }}
        key={`question${qitemNo}`}
      >

        {/* <div className="card bg-light py-4"> */}
        <Container>
          <div className="card-body text-center">
            <QuestionText>{question}</QuestionText>
            <div>

              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input
                    ref={ref}
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    className="form-check-input"
                    value={answerScore01}
                    onChange={() => {
                      if (typeof handleChange === "function") {
                        handleChange(qitemNo, answerScore01);
                      }
                    }}
                    defaultChecked={answerScore01 === initialValue}
                  />
                  {answer01}
                </label>
              </div>


              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input
                    ref={ref}
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    className="form-check-input"
                    value={answerScore02}
                    onChange={() => {
                      if (typeof handleChange === "function") {
                        handleChange(qitemNo, answerScore02);
                      }
                    }}
                    defaultChecked={answerScore02 === initialValue}
                  />
                  {answer02}
                </label>
              </div>

              
              
            </div>
          </div>
        {/* </div> */}
        </Container>
      </div>
    );
  }
);

export default Question;
