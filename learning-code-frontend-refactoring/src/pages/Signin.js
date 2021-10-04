import axios from 'axios';
import {useFormik} from 'formik';
import ProTypes from 'prop-types';
import {useState, useCallback} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import Auth, {AuthTitle, AuthInput} from '../components/Auth';

const LoginBtnBox = styled.div`
  width: 51%;
  height: 20px;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
`;

const LoginBtn = styled.button`
  width: 49%;
  height: 20px;
`;

const Signin = ({saveUserInfo}) => {
    const [currFocused, setCurrFocused] = useState({
        email: false,
        password: false,
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i, {message: '이메일 형식이 틀렸습니다'})
                .required('이메일을 입력해 주세요'),
            password: Yup.string()
                .required('비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다'),
        }),
        onSubmit: ({email, password}) => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_ORIGIN}/authentication/login`,
                data: {
                    email: `${email}`,
                    password: `${password}`,
                },
                'withCredentials': true,
            })
                .then(({data: {data: {user_id: userId, accessToken}}}) => {
                    localStorage.setItem(`${process.env.REACT_APP_USER_INFO}`, JSON.stringify({
                        userId: `${userId}`,
                        accessToken
                    }));
                    saveUserInfo({userId: `${userId}`, accessToken})
                })
                .catch(err => err)
        },
    });

    const handleClick = useCallback((event) => {
        event.preventDefault();
        formik.handleSubmit();
    }, []);

    const handleChange= useCallback((event) => {
        formik.handleChange(event);
    }, []);

    const handleBlur = useCallback((event) => {
        const {target: {name}} = event;
        setCurrFocused(name === 'password' ?
            {email: false, password: true} :
            {email: true, password: false});
        formik.handleBlur(event);
    }, []);


    return (
        <Auth>
            <>
                <AuthTitle>Learning Code 로그인</AuthTitle>
                <AuthInput
                    type='text'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='email'
                />
                <AuthInput
                    name='password'
                    type='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='password'
                />
                <LoginBtnBox>
                    <LoginBtn type='submit' onClick={handleClick} >Sign in</LoginBtn>
                    <LoginBtn><Link to='/signin/password'>Find password</Link></LoginBtn>
                </LoginBtnBox>
                {formik.touched.email && formik.errors.email && currFocused.email ? <div>{formik.errors.email}</div> : null}
                {formik.touched.password && formik.errors.password && currFocused.password ? <div>{formik.errors.password}</div> : null}
            </>
        </Auth>
    );
}

Signin.propTypes = {
    saveUserInfo: ProTypes.func.isRequired,
};

export default Signin;
