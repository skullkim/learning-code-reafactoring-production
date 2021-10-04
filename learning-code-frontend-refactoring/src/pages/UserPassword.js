import {useFormik} from 'formik';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import Auth, {AuthTitle, AuthInput} from '../components/Auth';
import Api from '../lib/customAxios';
import getUserInfo from '../lib/getUserInfo';

const SubmitBtn = styled.button`
  width: 52%;
  height: 30px;
  margin-top: 15px;
`;

const UserPassword = () => {

    const [currFocused, setCurrFocused] = useState('');
    const [newPasswd, setNewPasswd] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [userInfo] = useState(getUserInfo());
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            prevPassword: '',
            newPassword: '',
            verifyPassword: '',
        },
        validationSchema: Yup.object({
            prevPassword: Yup.string()
                .required('기존 비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다'),
            newPassword: Yup.string()
                .required('새로운 비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다'),
            verifyPassword: Yup.string()
                .required('새로운 비밀번호를 입력해 주세요')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '비밀번호는 8자이상, 영어, 숫자, 특수문자가 하나 이상 포함되야 합니다')
                .notOneOf([`${newPasswd}`], '비밀번호가 일치하지 않습니다')
        }),
        onSubmit: ({prevPassword, newPassword}) => {
            Api({
                method: 'put',
                url: `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/password`,
                headers: {
                    'Authorization': `Bearer ${userInfo.accessToken}`,
                },
                data: {
                    prevPassword,
                    newPassword,
                }
            })
                .then(() => history.push('/'))
                .catch(err => {
                    if(err.response.status === 401) {
                        const {response: {data: {errors: [message]}}} = err;
                        setErrMessage(message.message);
                    }
                    return err;
                })
        }
    });

    const handleChange = (event) => {
        const {target: {name, value}} = event;
        if(name === 'prevPassword') {
            setNewPasswd(value);
        }
        formik.handleChange(event);
    }

    const handleBlur = (event) => {
        const {target: {name}} = event;
        setCurrFocused(name);
        formik.handleBlur(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    return (
        <Auth>
            <>
                <AuthTitle>비밀번호 변경</AuthTitle>
                <AuthInput
                    type='password'
                    name='prevPassword'
                    placeholder='이전 비밀번호'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.touched.prevPassword && formik.errors.prevPassword &&
                    currFocused === 'prevPassword' && <div>{formik.errors.prevPassword}</div>
                }
                {errMessage && <div>{errMessage}</div>}
                <AuthInput
                    type='password'
                    name='newPassword'
                    placeholder='새로운 비밀번호'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword &&
                currFocused === 'newPassword' && <div>{formik.errors.newPassword}</div>
                }
                <AuthInput
                    type='password'
                    name='verifyPassword'
                    placeholder='비밃번호 확인'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.touched.verifyPassword && formik.errors.verifyPassword &&
                currFocused === 'verifyPassword' && <div>{formik.errors.verifyPassword}</div>
                }
                <SubmitBtn type='submit' onClick={handleSubmit}>
                    비밀번호 변경
                </SubmitBtn>
            </>
        </Auth>
    );
};

export default UserPassword;