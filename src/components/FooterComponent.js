import React from 'react';
import styled from 'styled-components';
import Whale from '../assets/common/whale.png';

const Footer = styled.div`
    font-family:'Binggrae';
    font-size:1.0rem;
    font-weight:400;
    text-align:left;
    margin-top:8.5rem;
    margin-left: 0.78rem;
    color:#FFFFFF;
`

const Logo = styled.img`
    width: 1.2rem;
`

function FooterComponent() {
    return (
        <Footer>@Copyright 2021. SeorinPark All rights reserved. &nbsp;<Logo src={Whale} /></Footer>
    );
}

export default FooterComponent;