import styled from "styled-components";

const Wrapper = styled.div`
  background: linear-gradient(
    20deg,
    hsl(${props => props.hue}, 60%, 65%),
    hsl(${props => props.hue - 305}, 64%, 60%)
  );
  height: 100%;
  width: 100%;
  padding-top: 0px;
`


const Title = styled.div`
  font-family:'Binggrae-Bold';
  font-size:2.5rem;
  text-align:center;
  color:#6B3FA0;
  margin-bottom:5.4rem;
`

const Description = styled.div`
  font-family:'Binggrae';
  font-size:1.4rem;
  font-weight:400;
  text-align:center;
  color:#6B3FA0;
  margin-bottom:4rem;
`


const Button = styled.button`
    width: 19.2rem;
    height: 5.5rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: '#8B748D';
    cursor:pointer;
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
        background: white;
        color: orange;
        cursor: not-allowed;
    }
`

const { useParams, Link } = require("react-router-dom");

const Completed = () => {
  const { seq: reportSeq } = useParams();

  return (
    <Wrapper hue={340}>
        <Title>검사가 완료되었습니다.</Title>
        <Description>
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고,
          <br />
          중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
        </Description>

        <Link to={`/result/${reportSeq}`}>
            결과 보기
        </Link>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </Wrapper>
  );
};

export default Completed;
