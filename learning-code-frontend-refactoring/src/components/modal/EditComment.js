import PropTypes from 'prop-types';
import {useState, useCallback} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import styled from 'styled-components';

import Api from '../../lib/customAxios';
import getUserInfo from '../../lib/getUserInfo';

import Portal from './Portal';

const ModalBox = styled.div`
  height: 250px;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -125px;
  margin-left: -200px;
  border: 1px solid black;
  box-shadow: 5px 3px 5px gray;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled(AiOutlineClose)`
  position: absolute;
  left: 5px;
  top: 5px;
`;

const CommentInput = styled.textarea`
  height: 150px;
  width: 250px;
`;

const CommentSubmit = styled.button`
  height: 30px;
  width: 70px;
  margin-top: 10px;
`;


const EditComment = ({closeModal, commentId, reloading, setReloading}) => {
    const [newComment, setNewComment] = useState('');
    const [commentLen, setCommentLen] = useState(0);
    const userInfo = getUserInfo();

    const handleClick = useCallback((event) => {
        event.preventDefault();
        Api({
            method: 'put',
            url: `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/comment/${commentId}`,
            headers: {
                'Authorization': `Bearer ${userInfo.accessToken}`,
            },
            data: {
                newComment,
            }
        })
            .then(() => {
                setReloading(!reloading);
                closeModal('');
            })
            .catch(err => err);
    }, [newComment]);

    const handleChange = useCallback(({target: {value}}) => {
        if(value.length > 300) {
            return;
        }
        setNewComment(value);
        setCommentLen(value.length);
    }, [newComment,commentLen]);

    return (
        <Portal>
            <ModalBox>
                <CloseBtn onClick={() => closeModal('')}/>
                <CommentInput onChange={handleChange} maxLength='300'/>
                <>
                    <span>{`${commentLen}/300`}</span>
                    <CommentSubmit type='submit' onClick={handleClick}>
                        수정
                    </CommentSubmit>
                </>
            </ModalBox>
        </Portal>
    );
}

EditComment.propTypes = {
    closeModal: PropTypes.func.isRequired,
    commentId: PropTypes.string.isRequired,
    reloading: PropTypes.bool.isRequired,
    setReloading: PropTypes.func.isRequired,
};

export default EditComment;
