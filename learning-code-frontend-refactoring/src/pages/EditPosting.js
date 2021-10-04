import {useHistory, useParams} from 'react-router-dom';

import Posting from '../components/Posting';
import getUserInfo from '../lib/getUserInfo';

const EditPosting = () => {
    const history = useHistory();
    const userInfo = getUserInfo();
    const {postingId} = useParams();

    return (
        <Posting
            history={history}
            userInfo={userInfo}
            postingId={postingId}
            edit
        />
    );
}

export default EditPosting;