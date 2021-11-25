import React, { useState } from "react";
import styled from "styled-components";

// 라디오 버튼
const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 3px 16px 10px 5px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
`;

const Text = styled.div`
  font-family:'Binggrae';
  font-size:1.3rem;
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
      margin: 6px;
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
        margin: 6px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;



const GenderRadioButton = React.forwardRef((props, ref) => {
  const [select, setSelect] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };


  return (
    <Wrapper className='form-check form-check-inline'>
      <Item className='form-check-label'>
        <RadioButton
          type='radio'
          name='gender'
          className="form-check-input"
          value='100323'
          ref={ ref }
          checked={select === '100323'}
          onChange={(event) => handleSelectChange(event)}
        />
        <RadioButtonLabel />
        <Text>남자</Text>
      </Item>

      <Item className='form-check-label'>
        <RadioButton
          type='radio'
          name='gender'
          className="form-check-input"
          value='100324'
          ref={ ref }
          checked={select === '100324'}
          onChange={(event) => handleSelectChange(event)}
        />
        <RadioButtonLabel />
        <Text>여자</Text>
      </Item>
    </Wrapper>
  );
});


export default GenderRadioButton;