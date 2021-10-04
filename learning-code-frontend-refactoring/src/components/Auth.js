import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthBox = styled.article`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LocalAuthBox = styled.form`
  width: 35%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthTitle = styled.h4`
  text-align: center;
`;

export const AuthInput = styled.input`
  width: 50%;
  height: 30px;
  margin-top: 10px;
`;

const Auth = ({children}) => {
    return (
        <AuthBox>
            <LocalAuthBox>
                {children}
            </LocalAuthBox>
        </AuthBox>
    )
}

Auth.propTypes = {
    children: PropTypes.element.isRequired,
}


export default Auth;