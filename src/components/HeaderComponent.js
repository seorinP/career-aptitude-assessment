import React from 'react';
import styled from 'styled-components';
import Whale from '../assets/common/whale.png';

const HeaderContainer = styled.div`
    font-family:'Binggrae-Bold';
    font-size:1.0rem;
    font-weight:400;
    text-align:left;
    color:#FFFFFF;
    margin-left: 1.3rem;
    margin-bottom: 3.6rem;
`

const Logo = styled.img`
    width: 1.2rem;
`

function Header() {
    return (
        <HeaderContainer><Logo src={Whale} />&nbsp;직업가치관검사</HeaderContainer>
    );
}

export default Header;