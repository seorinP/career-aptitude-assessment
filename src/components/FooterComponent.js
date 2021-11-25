import React from 'react';
import styled from 'styled-components';
import Whale from '../assets/common/whale.png';

const Footer = styled.div`
    font-family:'Binggrae-Bold';
    font-size:1.4rem;
    font-weight:400;
    text-align:center;
    margin-top:8.9rem;
    color:#A7A7A7;
`

const Logo = styled.img`
    width: 1.2rem;
`

function FooterComponent() {
    return (
        <Footer>made by Jasmine &nbsp;<Logo src={Whale} /></Footer>
    );
}

export default FooterComponent;