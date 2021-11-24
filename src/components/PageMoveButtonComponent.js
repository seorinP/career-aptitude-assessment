import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 10rem;
    height: 3rem;

    border-radius: 1.5rem;
    background-color: ${props =>
        props.type === 'previous' ? '#00462A'
            : props.type === 'previous' ? '#00462A'
                : props.theme.white};
    cursor:pointer;
    // margin : 0rem;
    // rem으로 하니까 동적이지 못함
    margin-left : ${props =>
        props.type === 'previous' ? '0rem' : '33rem'};
    display: inline-flex;

    color:${props =>
        props.type === 'previous' ? 'white'
            : 'black'};
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:${props => props.type === 'previous' ? 'Jalnan' : 'Spoqa-Han-Sans'};
    font-weight: 400;
    font-size:1.125rem;
    text-align:center;
    border:${props => props.type === 'previous' ? '3px solid #00462A' : '3px solid lightgray'};

    /* :hover{
        background-color: ${props => '#previous'};
        border:3px solid #00462A;
        color:white;
    } */

`

function PageMoveButton({ type, disabled, text, onClick }) {
    return (
        <Button type={type} disabled={disabled} onClick={onClick}>{text}</Button>
    )
}

export default PageMoveButton;