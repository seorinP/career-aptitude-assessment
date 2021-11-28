import React from 'react';
import styled from 'styled-components';

import InputName from '../../components/InputNameComponent';
import GenderRadioButton from '../../components/GenderRadioButtonComponent';
import ModalContainer from '../../components/ModalContainerComponent';


const Wrapper = styled.div`
    display:${props => props.pageIndex === 0 ? 'flex' : 'none'};
    width:100vw;
    height:100vh;
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
    font-family:'Binggrae';
    font-size:1.35rem;
    font-weight:400;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    text-align:center;
    color:#451919;
    margin-bottom:4rem;
`

const Title = styled.div`
    font-family:'Binggrae-Bold';
    font-size:2.7rem;
    text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white, 0 -2.5px white;
    text-align:center;
    color:#ed6ea0;
    margin-top:1.9rem;
    margin-bottom:6.4rem;
    
`
const FormContainer = styled.div`
    & + & {
        margin-top: 1rem;
    }
`

const Label = styled.div`
    font-family:'Binggrae-Bold';
    text-align: left;
    font-size: 1.05rem;
    color: white;
    text-shadow: -1.5px 0 #ed6ea0, 0 1.5px #ed6ea0, 1.5px 0 #ed6ea0, 0 -1.5px #ed6ea0;
    margin-top: 1.2rem;
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
`

const Landing = React.forwardRef((props, ref) => { 

    return (
        <>
        <input ref={ref} type="hidden" name="startDtm" />

        <Wrapper pageIndex={props.pageIndex}>
            <Container>
                <Intro>내 가치관에 맞는 찰떡 직업은 무엇일까?<br /> 내게 딱 맞는 직업 찾기 테스트!</Intro>

                {/* 제목 작성 */}
                <Title>" 찰떡직업 찾기 "</Title>

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

                {/* 모달창 버튼 */}
                <ModalContainer name={props.name} gender={props.gender} type={'button'} disabled={props.disabled} onClick={props.onClick} />

            </Container>
        </Wrapper>
    </>
    );
});

export default Landing;