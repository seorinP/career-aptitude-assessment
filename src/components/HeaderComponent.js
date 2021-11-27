import React from 'react';
import styled from 'styled-components';
import LogoImg from '../assets/common/logo.png';

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
    width: 10.5rem;
`

function Header() {
    return (
        <HeaderContainer>
            <Logo src={LogoImg} />
        </HeaderContainer>
    );
}

export default Header;