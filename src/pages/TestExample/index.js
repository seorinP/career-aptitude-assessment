import React from "react";
import Question from "../Test/Question";
import ProgressBar from "../../components/ProgressBarComponent";
import PageMoveButton from '../../components/PageMoveButtonComponent';
import StartButton from '../../components/StartButtonComponent';



function TestExample({ setSelectedValue, initialValue, disabled, pageIndex, progressPercentage, onClick1, onClick2 }) {
    return (
        pageIndex === 1 && (
            <>
            <div>
              <div className="mb-4">
                <ProgressBar text={'검사 예시'} percentage={progressPercentage} />
              </div>

              <h4 className="mb-4">
                직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에
                표시하세요.
              </h4>
  
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
  
  
              <div className="text-center">
                {/* 이전 다음 버튼 */}
                <PageMoveButton type={'previous'} text={'이전'} onClick={onClick1} />
                &nbsp;
                <StartButton type={'button'} disabled={disabled} text={'검사 시작'} onClick={onClick2} />
              </div>
  
  
            </div>
            </>
          )
    );
}

export default TestExample;