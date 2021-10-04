import {useState} from "react";
import {useHistory} from 'react-router-dom';

import Posting from "../components/Posting";
import getUserInfo from "../lib/getUserInfo";

const NewPosting = () => {
    const [userInfo] = useState(getUserInfo());
    const history = useHistory();

    return (
        <>
            <Posting userInfo={userInfo} history={history} />
        </>
    );
};

export default NewPosting;
