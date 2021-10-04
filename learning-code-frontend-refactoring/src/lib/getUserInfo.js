const getUserInfo = () => JSON.parse(
    localStorage.getItem(`${process.env.REACT_APP_USER_INFO}`)
);

export default getUserInfo;