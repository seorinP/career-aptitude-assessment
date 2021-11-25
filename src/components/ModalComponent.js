import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div `
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
`
const Container = styled.div `
    width: 500px;
    height: 300px;
    background-color: #fff;
    // Modal 창 브라우저 가운데로 조정
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index:100;
`
const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    color: ##6B3FA0;
    margin-top: 1.2rem;
    margin-bottom: 0.25rem;
`

const Button = styled.button `
    position: relative;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
`

const Modal = ({name, gender, type, onClick, modalClose}) => {

    const onCloseModal = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
            modalClose()
        }

    }
    return (
        <Wrapper onClick={onCloseModal}>
            <Container>
                <Label>
                    이름이 {name}이고 성별이 {gender}가 맞으십니까?
                </Label>
                <Button 
                    type={type}
                    onClick={onClick}
                    modalClose={modalClose}
                > 
                    진짜 테스트 시작!
                </Button>
            </Container>
        </Wrapper>
    )
}

export default Modal