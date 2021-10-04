import axios from 'axios';

import getUserInfo from './getUserInfo';
import reissuingToken from './reissuanceToken';

const Api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_ORIGIN}`,
    timeout: 1000,
    params: {},
});

Api.interceptors.request.use(
    config => config,
    err => {
        return Promise.reject(err);
    }
);

Api.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config;
        // eslint-disable-next-line no-underscore-dangle
        if(err.response.status === 403 && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            try {
                await reissuingToken();
                setTimeout(() => {
                    const userInfo = getUserInfo();
                    originalRequest.headers.Authorization = `Bearer ${userInfo.accessToken}`;
                    return axios(originalRequest);
                }, 100);
            }
            catch(error) {
                if(error.response && err.response.data) {
                    return Promise.reject(err.response.data);
                }
                return Promise.reject(error);
            }
        }
        return Promise.reject(err);
    }
);

export default Api;