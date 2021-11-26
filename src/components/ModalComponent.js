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
    display: grid;
    text-align: center;
    place-items: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 20em;
    min-height: 15em;
    padding: 2.5em;
    overflow-y: auto;
    color: #333;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    z-index: 101;
`
const Label = styled.div`
    font-family:'Binggrae';
    text-align: left;
    font-size: 1rem;
    color: ##6B3FA0;
    margin-top: 1.2rem;
    margin-bottom: 0.25rem;
`

const Button = styled.button `
font-family:'Binggrae-Bold';
    color: white;
    background: linear-gradient(225deg, #00DBDE 0%, #FC00FF 100%);
    font-size: 1rem;
    padding: 0.75rem 2rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    boder: none;
    border-radius: 4px;
    margin: 0.5rem;
    font-weight: 700;
    border-bottom: solid 2px rgba(0, 0, 0, 0.2);
    transition: all 0.1s;

    &:hover {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    }
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
                    이름이 {name}이고 성별이 {gender=='100323' ? "남자" : "여자"}가 맞으십니까?
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