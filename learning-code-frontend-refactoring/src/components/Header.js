import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Api from "../lib/customAxios";
// import getUserInfo from "../lib/getUserInfo";

// import getUserInfo from "../lib/getUserInfo";

const HeaderBox = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const LinkToLetters = styled(AiOutlineUnorderedList)`
  height: 35px;
  width: 35px;
  margin-right: 15px;
`;

const HeaderLogo = styled.img`
  height: 40px;
  width: 50px;
  margin-right: 15px;
`;

const SearchBox = styled.div`
  height: 35px;
  width: 400px;
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const SearchCategory = styled.select`
  height: 35px;
  width: 120px;
  margin-right: 10px;
  font-size: 14px;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 300px;
  padding: 0;
  margin-right: 10px;
`;

const SearchBtn = styled.button`
  background-color: transparent;
    border: 0;
`;

const SearchLogo = styled(ImSearch)`
    font-size: 25px;
`;

const NavBox = styled.nav`
  height: 35px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-size: 20px;
  color: #566270;
  margin-right: 10px;
`;

const Header = ({userInfo, setUserInfo}) => {
    const [headerInfo, setHeaderInfo] = useState({});
    const [searchTarget, setSearchTarget] = useState({
        category: '',
        target: '',
    });
    const history = useHistory();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/header`)
            .then(({data: {data}}) => setHeaderInfo(data))
            .catch(err => err);
    }, []);


    const handleChange = useCallback(({target: {name, value}}) => {
        if(!name || !value) return;
        setSearchTarget({
            ...searchTarget,
            [name]: value,
        });
    }, [searchTarget]);

    const handleFocus = (event) => {
        const eve = event;
        eve.target.value='';
    }

    const handleSearchClick = useCallback(() => {
        history.push(`/search/${searchTarget.category}?query=${searchTarget.target}`);
    }, [searchTarget]);

    const handleGoHomeClick = useCallback(() => {
        history.push('/');
    }, []);

    const handleKeyPress = useCallback(({key}) => {
        if(key === 'Enter') {
            history.push(`/search/${searchTarget.category}?query=${searchTarget.target}`);
        }
    }, [searchTarget]);

    const handleLogout = useCallback((event) => {
        event.preventDefault();
        Api({
            method: 'delete',
            url: `${process.env.REACT_APP_SERVER_ORIGIN}/authentication/logout`,
            headers: {
                'Authorization': `Bearer ${userInfo.accessToken}`,
            },
            withCredentials: true,
        })
            .then(() => {
                localStorage.removeItem(`${process.env.REACT_APP_USER_INFO}`);
                setUserInfo();
                history.push('/');
            })
            .catch(() => {
                setTimeout(() => {
                    localStorage.removeItem(`${process.env.REACT_APP_USER_INFO}`);
                }, 100);
                setUserInfo();
                history.push('/');
            });
    }, [userInfo]);

    return (
        <HeaderBox>
            <Link to='/letters'><LinkToLetters /></Link>
            <HeaderLogo
                src={`${process.env.REACT_APP_SERVER_ORIGIN}${headerInfo.logo}`}
                alt='header logo'
                onClick={handleGoHomeClick}
            />
            <SearchBox onKeyPress={handleKeyPress}>
                <SearchCategory name='category' onChange={handleChange}>
                    <option value=''>select category</option>
                    {headerInfo.search && headerInfo.search.map(({key, value}) => (
                        <option value={key} key={key}>{value}</option>
                    ))}
                </SearchCategory>
                <SearchInput
                    type='text'
                    name='target'
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
                <SearchBtn onClick={handleSearchClick} ><SearchLogo /></SearchBtn>
            </SearchBox>
            {!userInfo.userId ?
                <NavBox>
                    <NavLink to='/signin'>login</NavLink>
                    <NavLink to='/signup'>signup</NavLink>
                </NavBox> :
                <NavBox>
                    <NavLink to={`/user/${userInfo.userId}/posting`}>posting</NavLink>
                    <NavLink to={`/user/${userInfo.userId}/profile`}>profile</NavLink>
                    <NavLink to='#' onClick={handleLogout}>logout</NavLink>
                </NavBox>
            }
        </HeaderBox>
    );
}

Header.propTypes = {
    userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
    setUserInfo: PropTypes.func.isRequired,
};

export default Header;
