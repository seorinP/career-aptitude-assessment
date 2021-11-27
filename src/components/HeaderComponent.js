import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <HeaderContainer>
            <Link to="/">
                <Logo src={LogoImg} />
            </Link>
        </HeaderContainer>
    );
}

export default Header;