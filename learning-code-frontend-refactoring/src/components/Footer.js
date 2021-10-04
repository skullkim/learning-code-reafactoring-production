import axios from 'axios';
import {useState, useEffect} from "react";
import styled from 'styled-components';

const FooterBox = styled.footer`
    height: 80px;
    width: 100%;;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid gray;
`;

const Logo = styled.img`
    height: 60px;
    width: 80px;
`;

const InfoBox = styled.article`
    height: 60px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Developer = styled.h4`
    margin: 0;
`;

const GithubLink = styled.a``;

const Footer = () => {
    const [footerLogo, setFooterLogo] = useState('');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/footer`)
            .then(({data: {data: {logo}}}) => setFooterLogo(logo))
            .catch(err => err);
    }, []);

    return (
        <>
            <FooterBox>
                {footerLogo && <Logo src={`${process.env.REACT_APP_SERVER_ORIGIN + footerLogo}`} alt='footer logo' />}
                <InfoBox>
                    <Developer>Made by skullKim</Developer>
                    <GithubLink href="https://github.com/skullkim">github link</GithubLink>
                </InfoBox>
            </FooterBox>
        </>
    );
}

export default Footer;
