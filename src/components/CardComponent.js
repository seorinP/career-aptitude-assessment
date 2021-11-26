import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Anchor = styled.a`
  display: flex;
  width: 336px;
  height: 144px;
  border: 1px solid;
  border-radius: 3px;
  text-decoration: none;
  box-sizing: border-box;
  transition: transform 140ms ease-in-out 0s;
  &:hover {
    transform: translate3d(0, -2px, 0);
    &::after {
      opacity: 1;
    }

    &::before {
      opacity: 0;
    }
  }
`;


const Content = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  color: rgb(31, 134, 190);
  font-size: 1.14286em;
  line-height: line-height;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 8px;
  max-height: 20px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  max-height: 60px;
  max-width: 100%;
  text-align: left;
  color: rgb(23, 43, 77);
`;

function Card() {
    return (
      <Anchor href={url}>
        <Container>
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Content>
        </Container>
      </Anchor>
    );
  }


// function Card({ title, description }) {
//   return (
//     <Anchor href={url}>
//       <Container>
//         <Content>
//           <Title>{title}</Title>
//           <Description>{description}</Description>
//         </Content>
//       </Container>
//     </Anchor>
//   );
// }

export default Card;