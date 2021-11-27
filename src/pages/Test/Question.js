import { forwardRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-left:4rem;
  margin-right:4rem;
  margin-bottom:4rem;
  background-color: white;
  // background-image:linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%);
  padding: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 3px 16px 10px 5px;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  position: relative; 
`;

const Text = styled.div`
  font-family:'Binggrae';
  font-size:1.27rem;
`

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;

  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 5px;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #db7290;
      border: 1px solid #db7290;

      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 5px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
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
    
  const [select, setSelect] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  const handleAnswer = (qitemNo, answerScore) => {
    if (typeof handleChange === "function") {
      handleChange(qitemNo, answerScore);
    }
  };

  

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
            {/* {question} */}

            <Wrapper className="form-check form-check-inline">
                <Item className='form-check-label'>
                  <RadioButton
                    ref={ref}
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    className="form-check-input"
                    value={answerScore01}
                  // 이건 추가됨 원래 ===인데 ==로 해야 됨 왜지..왜...
                    checked={select == answerScore01}
                  // 여기가 기존하고 변경 되었음
                  //  onChange={handleAnswer(qitemNo, answerScore01), event=>handleSelectChange(event)}
                  onChange={(event) => {
                    handleAnswer(qitemNo, answerScore01);
                    handleSelectChange(event);
                  }}
                    defaultChecked={answerScore01 === initialValue}
                  />
                  <RadioButtonLabel /> &nbsp;&nbsp;
                  <Text>{answer01}</Text>
                </Item>
              
              {console.log(`select : ${select}`)}
              {console.log(`answerScore01 : ${answerScore01}`)}
              {console.log(`answerScore02 : ${answerScore02}`)}
              {console.log(`checked answerScore01 : ${select == answerScore01}`)}
              {console.log(`checked answerScore02 : ${select == answerScore02}`)}
              {console.log(`checked answerScore01 : ${select === answerScore01}`)}
              {console.log(`checked answerScore02 : ${select === answerScore02}`)}
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              {/* <div className="form-check form-check-inline">
                <label className="form-check-label" style={{fontFamily:'Binggrae-Bold'}}>
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
              </div> */}


              {/* <Wrapper className="form-check form-check-inline"> */}
                <Item className='form-check-label'>
                  <RadioButton
                    ref={ref}
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    className="form-check-input"
                    value={answerScore02}
                    checked={select == answerScore02}
                    // onChange={handleAnswer(qitemNo, answerScore02), event=>handleSelectChange(event)}
                    onChange={(event) => {
                      handleAnswer(qitemNo, answerScore02);
                      handleSelectChange(event);
                    }}
                    defaultChecked={answerScore02 === initialValue}
                  />
                  <RadioButtonLabel /> &nbsp;&nbsp;
                  <Text>{answer02}</Text>
                </Item>
              </Wrapper>




              {/* <div className="form-check form-check-inline">
                <label className="form-check-label" style={{fontFamily:'Binggrae-Bold'}}>
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
              </div> */}

            
              
            </div>
          {/* </div> */}
        {/* </div> */}
        </Container>
      </div>
    );
  }
);

export default Question;
