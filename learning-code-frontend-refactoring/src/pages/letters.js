import axios from 'axios';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import Category from "../components/Category";
import LetterList from "../components/LetterList";

const LettersPageBox = styled.main`
  width: 100%;
  height: auto;
  display: flex;
`;

const ResultBox = styled.article`
  width: 100%;
  height: 100%;
  margin: 0 30px;
`;

const Letters = () => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/letters`)
            .then(({data: {data}}) => setLetters(data))
            .catch(err => err);
        setLoading(false);
    }, []);

    if(loading) {
        return (<div>loading...</div>)
    }

    return (
        <LettersPageBox>
            <Category />
            <ResultBox>
                {letters.length && letters.map(({id, title, main_category: mainCategory}) => (
                    <LetterList key={id} id={id} title={title} mainCategory={mainCategory} />
                ))}
            </ResultBox>
        </LettersPageBox>
    );
};

export default Letters;