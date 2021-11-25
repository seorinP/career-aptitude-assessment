import React from 'react';
import styled from 'styled-components';
import Whale from '../assets/common/whale.png';

const HeaderContainer = styled.div`
    font-family:'Spoqa-Han-Sans';
    font-size:1.4rem;
    font-weight:400;
    text-align:left;
    color:#A7A7A7;
`

const Logo = styled.img`
    width: 1.2rem;
`

function Header() {
    return (
        <HeaderContainer><Logo src={Whale} /> &nbsp; 직업가치관검사</HeaderContainer>
    );
}

export default Header;