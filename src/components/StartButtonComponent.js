import React from 'react';
import styled from 'styled-components';

//type에 따라서 초록 버튼인지 회색 테두리 버튼인지 결정하게 수정하면 편함
// 맨 처음 시작하기 버튼
const Button = styled.button`
    width: 29.2rem;
    height: 6.5rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.type === 'button' ? '#8B748D' : 'pink'};
    cursor:pointer;
    margin : 1.5rem;
    display: inline-flex;
    font-family:'Binggrae-Bold';
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight: 400;
    font-size:2.0rem;
    text-align:center;
    border:none;

    &:disabled {
        background: white;
        color: orange;
        cursor: not-allowed;
    }
`

function StartButton({ disabled, type, text, onClick }) {

    return (
        <Button type={type} disabled={disabled} onClick={onClick}>{text}</Button>
    );

}

export default StartButton;