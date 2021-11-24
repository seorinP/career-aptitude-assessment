import React from 'react';

const ProgressBar = ({ percentage }) => {


  const containerStyles = {
    height: '1.0rem',
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginBottom: '5rem'
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    background: ' #8B748D',
    borderRadius: '20px',
    transition: '1s ease 0.005s'
  }

  const progressPercentage = {
    // 수정해야됨
    float: 'right'
  }


  return (
    <>
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