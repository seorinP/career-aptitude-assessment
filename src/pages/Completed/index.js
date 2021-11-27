import styled from "styled-components";
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';

const Wrapper = styled.div`
  background:linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
  height: 100%;
  width: 100%;
  padding-top: 0px;
`
const Boundary = styled.div `
  margin: 4.0rem 4.8rem;
  height: 100%;
  justify-content:center;
  align-items:center;
`

const Title = styled.div`
  font-family:'Binggrae-Bold';
  font-size:2.5rem;
  text-shadow: 1px 2px 1.5px rgba(0, 0, 0, 0.25);
  text-align:center;
  color:white;
  margin-bottom:4.0rem;
`

const Description = styled.div`
  font-family:'Binggrae';
  font-size:1.4rem;
  font-weight:400;
  text-shadow: 1px 2px 1.5px rgba(0, 0, 0, 0.25);
  text-align:center;
  color:white;
  margin-bottom:4rem;
`


const Button = styled.button`
    width: 19.2rem;
    height: 5.5rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
    cursor:pointer;
    display: flex;
    font-family:'Binggrae-Bold';
    color:white;
    justify-content:center;
    align-items:center;
    font-weight: 400;
    font-size:2.0rem;
    text-align:center;
    border:none;
    margin: 0 auto;

    :hover{
      border:5px solid white;
      color:white;
  } 
`

const { useParams, Link } = require("react-router-dom");

const Completed = () => {
  const { seq: reportSeq } = useParams();

  return (
    <Wrapper>
      <Header />
      <Boundary>
        <br />
        <br />
        <Title>검사가 완료되었습니다.</Title>
        <Description>
          검사결과는 여러분이 직업을 선택할 때 <br /> 
          상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,<br />
          중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
        </Description>

        <Button>
          <Link to={`/result/${reportSeq}`} style={{color:'white'}}> 결과 보기 </Link>
        </Button>
      
        
        
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
        </Boundary>
        <FooterComponent />
    </Wrapper>
  );
};

export default Completed;
