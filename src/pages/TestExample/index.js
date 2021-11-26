import React from "react";
import styled from 'styled-components';

import Question from "../Test/Question";
import ProgressBar from "../../components/ProgressBarComponent";
import PageMoveButton from '../../components/PageMoveButtonComponent';


const Title = styled.div`
    font-family:'Binggrae-Bold';
    font-size:1.5rem;
    text-align:center;
    color:#6B3FA0;
    margin-top:1.9rem;
    margin-bottom:6.4rem;
`


function TestExample({ setSelectedValue, initialValue, disabled, pageIndex, progressPercentage, onClick1, onClick2 }) {
    return (
            <>
              <div className="mb-4">
                <ProgressBar text={'검사 예시'} percentage={progressPercentage} />
              </div>

              <Title>
                직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
                표시하세요.
              </Title>
        
              <Question
                qitemNo={999}
                question="두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요."
                answer01="창의성"
                answer02="안정성"
                answerScore01={-1}
                answerScore02={-2}
                initialValue={initialValue}
                onChange={(qitemNo, answerScore) => {
                    setSelectedValue(answerScore);
                }}
              />
  
              
              <div className="button d-flex justify-content-between">
                {/* 이전 다음 버튼 */}
                <PageMoveButton className='button' type={'previous'} text={'처음 화면으로'} onClick={onClick1} />
                &nbsp;
                <PageMoveButton className='button' type={'next'} disabled={disabled} text={'검사 시작'} onClick={onClick2} />
              </div>
            </>
    );
}

export default TestExample;