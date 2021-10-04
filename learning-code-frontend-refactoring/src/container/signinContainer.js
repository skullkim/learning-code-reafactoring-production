import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {saveUserInfo} from "../modules/auth";
import Signin from "../pages/Signin";

const SigninContainer = ({saveUserInfo: setUserInfo}) => {
    return <Signin saveUserInfo={setUserInfo} />;
}

SigninContainer.propTypes = {
    saveUserInfo: PropTypes.func.isRequired,
};

export const SigninPage = connect(
    () => ({}),
    {
        saveUserInfo,
    }
)(SigninContainer);