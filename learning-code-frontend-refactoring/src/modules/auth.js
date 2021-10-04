import getUserInfo from "../lib/getUserInfo";

const SAVE_USER_INFO = 'auth/SAVE_USER_INFO';

const storageUserInfo = getUserInfo();

const initialState = {
    userInfo: {
        userId: storageUserInfo ? storageUserInfo.userId : '',
        accessToken: storageUserInfo ? storageUserInfo.accessToken : '',
    },
};

export const saveUserInfo = (userInfo = {userId: '', accessToken: ''}) => ({
    type: SAVE_USER_INFO,
    userInfo
});

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                userInfo: {...action.userInfo},
            };
        default:
            return state;
    }
}

export default authReducer;