import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useEffect, useState} from "react";
import {useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';

import BookList from "../components/BookList";
import Category from "../components/Category";
import LetterList from "../components/LetterList";

const SearchPageBox = styled.main`
  width: 100%;
  height: auto;
  display: flex;
`;

const ResultBox = styled.article`
  width: 100%;
  height: 100%;
  margin: 0 30px;
`;

const Warning = styled.h4``;


const SearchResult = ({search}) => {
    const [searchResult, setSearchResult] = useState([]);
    const [noResult, setNoResult] = useState('');
    const [loading, setLoading] = useState(false);
    const {query} = qs.parse(useLocation().search, {
        ignoreQueryPrefix: true,
    });
    const {category} = useParams();

    useEffect(() => {
        search(false);
    });

    useEffect(() => {
        setLoading(true);
        setSearchResult([]);
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/search/${category}?query=${query}`)
            .then(({data: {data}}) => {
                setNoResult(data[0].message ?? '');
                setSearchResult(data);
            })
            .catch(err => err);
        setLoading(false);
    }, [category, query]);

    if(loading) {
        return <Warning>loading...</Warning>;
    }
    return (
        <SearchPageBox>
            <Category />
            <ResultBox>
                {searchResult.length && noResult && <Warning>{query}에 대한 검색 결과가 없습니다</Warning>}
                {category !== 'book' ?
                    searchResult && searchResult.length && searchResult[0].id && !noResult && searchResult.map(({ id, title, main_category: mainCategory }) => {
                        if(!id) return (<Warning>loading...</Warning>);
                        return (
                            <LetterList key={id} id={id} title={title} mainCategory={mainCategory} />
                        );
                    }) :
                    searchResult && searchResult.length && searchResult[0].url && !noResult && searchResult.map(({authors, contents, title, thumbnail, url}) => {
                        if(!url) return (<Warning>loading...</Warning>);
                        return (
                            <BookList
                                key={url}
                                authors={authors}
                                contents={contents}
                                title={title}
                                thumbnail={thumbnail}
                                url={url}
                            />
                        )})
                }
            </ResultBox>
        </SearchPageBox>
    );
}

SearchResult.propTypes = {
    search: PropTypes.func.isRequired,
};

export default SearchResult;