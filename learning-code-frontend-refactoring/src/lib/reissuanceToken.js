import axios from 'axios';

import {saveUserInfo} from '../modules/auth';

const reissuingToken = async () => {
    const {userId} = JSON.parse(
        localStorage.getItem('userInfo')
    );
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_ORIGIN}/authentication/token`,
        withCredentials: true,
    })
        .then(({data: {data: {access_token: accessToken}}}) => {
            localStorage.removeItem('userInfo');
            saveUserInfo({userId, accessToken});
            localStorage.setItem('userInfo', JSON.stringify({
                userId: `${userId}`,
                accessToken,
            }));
        })
        .catch(error => error);
}

export default reissuingToken;