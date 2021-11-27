import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 10rem;
    height: 3rem;

    border-radius: 1.5rem;
    background-image:linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
    cursor:pointer;
    display: inline-flex;

    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:'Binggrae-Bold';
    font-weight: 400;
    font-size:1.125rem;
    text-align:center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // border:${props => props.type === 'previous' ? '3px solid #00462A' : '3px solid lightgray'};

    :hover{
        border:3px solid white;
        color:white;
    } 

    // &:disabled:hover {
    //     background-color: white;
    //     color: black;
    //     cursor: not-allowed;
    // }

`

function PageMoveButton({ type, disabled, text, onClick }) {
    return (
        <Button type={type} disabled={disabled} onClick={onClick}>{text}</Button>
    )
}

export default PageMoveButton;