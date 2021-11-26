import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  font-family:'Binggrae-Bold';
  font-size:1.5rem;
  margin-left: 2rem,
`

const ProgressBar = ({ text, percentage }) => {


  const containerStyles = {
    height: '1.0rem',
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    //paddingLeft: '2rem',
    //marginRight: '10rem',
    marginBottom: '5rem'
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    background: ' #8B748D',
    borderRadius: '20px',
    transition: '1s ease 0.005s',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  }

  const progressPercentage = {
    // 수정해야됨
    float: 'right'
  }


  return (
    <>
      {/* <div className="row justify-content-between"> */}
      <div className="d-flex justify-content-between">
        {/* 여긴 Logo가 든 Header를 넣자. Home으로 돌아가기 */}
        {/* 검사 진행에 스타일 입히기 */}
        <Text>{text}</Text>
        <h3>{percentage}%</h3>
      </div>

      <div style={containerStyles}>
        <div
          role = 'progressbar'
          style = {{width: `${percentage}%`}}
        ></div>
        <div style={fillerStyles}>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;