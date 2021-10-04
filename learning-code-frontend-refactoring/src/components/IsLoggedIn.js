import axios from 'axios';

import reissuingToken from "../lib/reissuanceToken";

const IsLoggedIn = async () => {
    const userInfo = JSON.parse(
        localStorage.getItem('userInfo')
    );
    if(!userInfo) {
        return false;
    }
    let loggedIn = false;
    try {
        const result = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_ORIGIN}/authentication/logged-in`,
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        });
        if(result) {
            loggedIn = true;
        }
    }
    catch(err) {
        if(err.response.status !== 403) {
            return loggedIn;
        }
        await reissuingToken();
        loggedIn = true;
    }
    return loggedIn;
}

export default IsLoggedIn;