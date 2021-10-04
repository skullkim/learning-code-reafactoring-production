import axios from 'axios';
import {useFormik} from "formik";
import {useState, useEffect, useCallback} from "react";
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import getUserInfo from "../lib/getUserInfo";

const LetterBox = styled.main`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const PostingBox = styled.article`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const TitleBox = styled.section`
  width: 80%;
  height: 100px;
  border-bottom: 1px solid gray;
  
`;

const Title = styled.h3``;

const Author = styled.h4`
    margin-bottom: 0;
`;

const WritingBox = styled.section`
  height: auto;
  width: 80%;
  margin-top: 10px;
`;

const Writing = styled.textarea`
  width: 100%;
  height: 500px;
  background-color: transparent;
  border: 0;
`;

const ImageBox = styled.section`
  width: 80%;
  height: 100px;
`;

const Image = styled.img`
  height: 100px;
  width: 70px;
  
`;

const TagBox = styled.section`
  height: 100px;
  width: 80%;
  border-bottom: 1px solid black;
`;

const Tag = styled.p`
    margin: 0;
`;

const CommentsBox = styled.article`
  width: 80%;
  height: 200px;
  overflow: scroll;
  margin-top: 20px;
`;

const WriteCommentBox = styled.section`
  align-self: flex-start;
  margin-left: 10vw;
  margin-top: 10px;
`;

const CommentInput = styled.textarea`
  height: 50px;
  width: 500px;
`;

const CommentSubmit = styled.button`
  width: 50px;
  height: 20px;
`;

const CommentBox = styled.section`
  width: 80%;
  height: 50px;
  border: 1px solid black;
`;

const Commenter = styled(Author)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 0;
`;

const Comment = styled(Tag)``;


const Letter = () => {
    const {letterId} = useParams();
    const [letter, setLetter] = useState({});
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [userInfo] = useState(getUserInfo());

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('덧글을 입력해 주세요')
        }),
        onSubmit: ({comment}) => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/posting/${letterId}/comment`,
                headers: {
                    'Authorization': `Bearer ${userInfo.accessToken}`,
                },
                data: {comment}
            })
                .then(() => setReloading(!reloading))
                .catch(err => err)
        }
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/letter/${letterId}`)
            .then(({data: {data}}) =>  setLetter(data))
            .catch(err => err);
        setLoading(false);
    },[reloading]);

    if(loading){
        return (<div>loading...</div>);
    }

    const handleChange = useCallback((event) => {
        formik.handleChange(event);
    }, []);

    const handleClick = useCallback((event) => {
        event.preventDefault();
        formik.handleSubmit();
    }, []);

    return (
        <LetterBox>
            <PostingBox>
                <TitleBox>
                    <Title>{letter.main_data && letter.main_data.title}</Title>
                    <Author>{letter.main_data && letter.main_data.author}</Author>
                </TitleBox>
                <WritingBox>
                    <Writing value={letter.main_data && letter.main_data.main_posting} readOnly />
                </WritingBox>
                {letter.images && letter.images.length ?
                    <ImageBox>
                        {letter.images.map(({id}) => (
                            <Image
                                src={`${process.env.REACT_APP_SERVER_ORIGIN}/letter/${letterId}/images/${id}`}
                                alt='posting image'
                                key={id}
                            />
                        ))}
                    </ImageBox> :
                    <></>
                }
                {letter.tags && letter.tags.length ?
                    <TagBox>
                        {letter.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagBox> :
                    <></>
                }
            </PostingBox>
            {userInfo && userInfo.userId &&
                <WriteCommentBox>
                    <CommentInput
                        name='comment'
                        type='text'
                        placeholder='댓글'
                        onChange={handleChange}
                    />
                    <CommentSubmit type='submit' onClick={handleClick}>작성</CommentSubmit>
                </WriteCommentBox>
            }
            {letter.comments && letter.comments.length ?
                <CommentsBox>
                    {letter.comments.map(({id, commenter, comment}) => (
                        <CommentBox key={id}>
                            <Commenter>{commenter}</Commenter>
                            <Comment>{comment}</Comment>
                        </CommentBox>
                    ))}
                </CommentsBox> :
                <></>
            }
        </LetterBox>
    );
};

export default Letter;