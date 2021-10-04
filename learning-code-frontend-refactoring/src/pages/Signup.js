import axios from 'axios';
import {useFormik} from "formik";
import {useState, useCallback} from "react";
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import Auth, {AuthTitle, AuthInput} from "../components/Auth";

const SignUpBtn = styled.button`
  width: 51%;
  height: 30px;
  margin-top: 20px;
`;

const Signup = () => {
    const [currFocused, setCurrFocused] = useState('');
    const [errReason, setErrorReason] = useState('');
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            verifyPasswd: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i, {message: '이메일 형식이 틀렸습니다'})
                .required('이메일을 입력해 주세요'),
            password: Yup.string()
                .required('비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다'),
            verifyPasswd: Yup.string()
                .required('비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다'),
        }),
        onSubmit: ({name, email, password}) => {
            axios.post(
                `${process.env.REACT_APP_SERVER_ORIGIN}/authentication/signup`,
                {name, email, password}
            )
                .then(() => {
                    setErrorReason('');
                    history.push('/');

                })
                .catch(({response:{data:{errors: [message]}}}) => setErrorReason(message));
        }
    });

    const handleChange = useCallback((event) => {
        formik.handleChange(event);
    }, []);

    const handleClick = useCallback((event) => {
        event.preventDefault();
        formik.handleSubmit();
    }, []);

    const handleBlur = useCallback((event) => {
        const {target: {name}} = event;
        setCurrFocused(name);
        formik.handleBlur(event);
    }, []);

    return (
        <Auth>
            <>
                <AuthTitle>Learning code 회원가입</AuthTitle>
                <AuthInput
                    type='text'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="아이디"
                />
                <AuthInput
                    type='text'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="이메일"
                />
                <AuthInput
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="비밀번호"
                />
                <AuthInput
                    type='password'
                    name='verifyPasswd'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="비밀번호 확인"
                />
                <SignUpBtn type='submit' onClick={handleClick}>회원가입</SignUpBtn>
                {formik.touched.name && formik.errors.name && currFocused === 'name' ? <div>{formik.errors.name}</div> : null}
                {formik.touched.email && formik.errors.email && currFocused === 'email' ? <div>{formik.errors.email}</div> : null}
                {formik.touched.password && formik.errors.password && currFocused === 'password' ? <div>{formik.errors.password}</div> : null}
                {formik.touched.verifyPasswd && formik.errors.verifyPasswd && currFocused === 'verifyPasswd' ? <div>{formik.errors.verifyPasswd}</div> : null}
                {formik.touched.verifyPasswd && currFocused === 'verifyPasswd' && formik.values.verifyPasswd !== formik.values.password ? <div>비밀번호가 일치하지 않습니다</div> : null}
                {errReason && <div>{errReason.message}</div>}
            </>
        </Auth>
    );
}

export default Signup;
