import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  color: #ed6ea0;
  font-family:'Binggrae-Bold';
  font-size:1.5rem;
  text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white, 0 -2.5px white;
  margin: 0rem 1rem 0.35rem 1rem;
`

const ProgressBar = ({ text, percentage }) => {


  const containerStyles = {
    height: '1.0rem',
    width: '100%',
    backgroundColor: "#F9F6FF",
    borderRadius: 50,
    marginBottom: '5rem'
    
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    background: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
    borderRadius: '20px',
    transition: '1s ease 0.005s',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  }


  return (
    <>
      {/* <div className="row justify-content-between"> */}
      <div className="d-flex justify-content-between">
        {/* 검사 진행에 스타일 입히기 */}
        <Text>{text}</Text>
        <Text>{percentage}%</Text>
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