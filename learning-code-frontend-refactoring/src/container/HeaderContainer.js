import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from '../components/Header';
import {saveUserInfo} from "../modules/auth";

const HeaderContainer = ({userInfo, saveUserInfo: setUserInfo}) => {
    return <Header userInfo={userInfo} setUserInfo={setUserInfo} />;
}

HeaderContainer.propTypes = {
    userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
    saveUserInfo: PropTypes.func.isRequired,
};

export const PageHeader = connect(
    ({authReducer}) => ({
        userInfo: authReducer.userInfo,
    }),
    {
        saveUserInfo,
    }
)(HeaderContainer);