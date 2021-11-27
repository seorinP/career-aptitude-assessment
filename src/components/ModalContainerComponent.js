import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/ModalComponent';


//type에 따라서 초록 버튼인지 회색 테두리 버튼인지 결정하게 수정하면 편함
// 맨 처음 시작하기 버튼
const Button = styled.button`
    width: 29.2rem;
    height: 7rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
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
        background: linear-gradient(to right, #f8e6cb 0%, white 100%);
        color: #FFFFFF;
        cursor: not-allowed;
    }
`

function ModalContainer({ name, gender, disabled, type, onClick }) {
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = () => {
        setModalOpen(!modalOpen)

    }

    return (
        <>
        <Button type={type} disabled={disabled} onClick={modalClose}>내 찰떡 직업 알아보기</Button>
        { modalOpen && 
            <Modal 
                name={name}
                gender={gender}
                type={type} 
                onClick={onClick}
                modalClose={modalClose}
            />
        }
        </>

    )
}

export default ModalContainer