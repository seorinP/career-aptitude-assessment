import { forwardRef } from "react";

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

        <div className="card bg-light py-4">
          <div className="card-body text-center">
            <div>{question}</div>
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
        </div>
      </div>
    );
  }
);

export default Question;
