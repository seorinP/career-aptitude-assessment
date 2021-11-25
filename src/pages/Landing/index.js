import React from 'react';
import styled from 'styled-components';

import InputName from '../../components/InputNameComponent';
import GenderRadioButton from '../../components/GenderRadioButtonComponent';
import StartButton from '../../components/StartButtonComponent';
import ModalContainer from '../../components/ModalContainerComponent';

const Wrapper = styled.div`
    display:${props => props.pageIndex === 0 ? 'flex' : 'none'};
    width:100%;
    background-color:white;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Container = styled.div`
    margin-top:5rem;
    margin-bottom:5rem;
    text-align:center;
`

const Intro = styled.div`
    font-family:'Spoqa-Han-Sans';
    font-size:1.4rem;
    font-weight:400;
    text-align:center;
    color:#A7A7A7;
    margin-bottom:4rem;
`

const Title = styled.div`
    font-family:'Jalnan';
    font-size:2.5rem;
    text-align:center;
    color:#6B3FA0;
    margin-top:1.9rem;
    margin-bottom:6.4rem;
`
const FormContainer = styled.div`
    & + & {
        margin-top: 1rem;
    }
`

const Label = styled.div`
    text-align: left;
    font-size: 1rem;
    color: ##6B3FA0;
    margin-top: 1.2rem;
    margin-bottom: 0.25rem;
`

const Landing = React.forwardRef((props, ref) => { 

    return (
        <>
        <input ref={ref} type="hidden" name="startDtm" />

        <Wrapper pageIndex={props.pageIndex}>
            <Container>
                <Intro>내 가치관에 맞는 찰떡 직업은 무엇일까?<br /> 내게 딱 맞는 직업 찾기 테스트</Intro>

                {/* 제목 작성 */}
                <Title>Find My Fit Job</Title>

                {/* 이름 작성 */}
                <FormContainer>
                    <Label>이름</Label>
                    <InputName errors={props.errors}  ref={ref} />
                </FormContainer>

                {/* 성별 선택 */}
                <FormContainer>
                    <Label>성별</Label>
                    <GenderRadioButton ref={ref} />
                </FormContainer>

                {/* 시작화면 버튼 */}
                {/* <StartButton type={'button'} disabled={props.disabled} text={'내 직업 알아보기'} onClick={props.onClick} /> */}
                <ModalContainer name={props.name} gender={props.gender} type={'button'} disabled={props.disabled} onClick={props.onClick} />

            </Container>
        </Wrapper>
    </>
    );
});

export default Landing;