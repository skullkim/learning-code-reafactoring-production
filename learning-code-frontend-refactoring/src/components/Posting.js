import FormData from "form-data";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from 'yup';

import Api from '../lib/customAxios';

const PostingBox = styled.main`
  height: 800px;
  width: 100%;
`;

const PostingForm = styled.form`
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 70vw;
  height: 40px;
  margin-top: 20px;
`;

const CategorySelection = styled.select`
  width: 70vw;
  height: 30px;
  margin-top: 15px
`;

const TagSelection = styled.section`
  width: 70vw;
  margin-top: 15px;
`;

const TagCheckBox = styled.input``;

const PostingContext = styled.textarea`
  width: 70vw;
  height: 500px;
  margin-top: 15px;
  overflow: scroll;
`;

const PostingLimit = styled.p`
    position: relative;
    left: -32%;
`;

const SelectImgBox = styled.section`
    width: 70vw;
`;

const ImgInput = styled.input``;

const SubmitBtn = styled.button`
  width: 70vw;
  height: 30px;
  margin-top: 20px;
`;

const Posting = ({userInfo, history, edit, postingId}) => {
    const [postingInfo, setPostingInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postingLimit, setPostingLimit] = useState(0);
    const [editPostingInfo, setEditPostingInfo] = useState({});

    const formik = useFormik({
        initialValues: {
            title: '',
            posting: '',
            category: '',
            tags: [],
            imgs: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().max(45, '제목을 45자 이내로 적어주세요').required('제목이 비어있습니다'),
            posting: Yup.string().required('본문이 비어있습니다'),
            category: Yup.string().required('카테고리를 선택해 주세요'),
        }),
        onSubmit: ({title, posting, category, tags, imgs}) => {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('posting', posting);
            formData.append('category', category);
            formData.append('tags', tags);
            if(imgs.length) {
                imgs.forEach(img => {
                    formData.append('imgs', img, img.name);
                });
            }
            const req = {
                method: !edit ? 'post' : 'put',
                url: !edit ?
                    `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/posting` :
                    `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/posting/${postingId}`,
            }
            Api({
                method: `${req.method}`,
                url: `${req.url}`,
                headers: {
                    'Authorization': `Bearer ${userInfo.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            })
                .then(() => history.push('/'))
                .catch(err => err);
        }
    });

    useEffect(() => {
        setLoading(true);
        if(!userInfo) {
            history.push('/');
        }
        const url = !edit ?
            `${process.env.REACT_APP_SERVER_ORIGIN}/letters/categories` :
            `${process.env.REACT_APP_SERVER_ORIGIN}/user/${userInfo.userId}/posting/${postingId}`;
        Api({
            method: 'get',
            url: `${url}`,
            headers: {
                'Authorization': `Bearer ${userInfo.accessToken}`,
            }
        })
            .then(({data: {data}}) => {
                if(!edit) {
                    setPostingInfo(data)
                }
                else {
                    const {categories,
                        posting: {
                            main_category: mainCategory,
                            main_posting: mainPosting,
                            ...posting
                        },
                        ...restData} = data;
                    const categoriesToJson = JSON.parse(categories);
                    formik.values.category = mainCategory;
                    formik.values.title = posting.title;
                    formik.values.posting = mainPosting;
                    setEditPostingInfo({
                        categories: categoriesToJson,
                        mainCategory,
                        posting,
                        ...restData
                    });
                }
            })
            .catch(err => err);
        setLoading(false);
    }, []);

    const handleChange = (event) => {
        const {target: {name, value}} = event;
        switch (name) {
            case 'posting':
                if(value.length > 5000) {
                    return;
                }
                setPostingLimit(value.length);
                break;
            case 'imgs':{
                const {currentTarget: {files}} = event;
                const filesArr = Array.prototype.slice.call(files);
                filesArr.forEach(file => {
                    formik.values.imgs = formik.values.imgs.concat(file);
                });
                return;
            }
            case 'tag': {
                if(formik.values.tags.includes(value)) {
                    formik.values.tags = formik.values.tags.filter((tag) => tag !== value);
                }
                else {
                    formik.values.tags = formik.values.tags.concat(value);
                }
                break;
            }
            default:
                break;
        }
        formik.handleChange(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formik.handleSubmit();
    }

    if(loading) {
        return <div>loading...</div>
    }

    return (
        <PostingBox>
            <PostingForm>
                <TitleInput
                    type='text'
                    name='title'
                    placeholder='제목'
                    value = {formik.values.title}
                    onChange={handleChange}
                />
                {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
                <CategorySelection onChange={handleChange} name='category' value={formik.values.category}>
                    <option value="">=== 글 카테고리 선택 ===</option>
                    {!edit && postingInfo.length && postingInfo.map(({key, main_category: category}) => (
                        <option key={key} value={category}>{category}</option>
                    ))}
                    {edit && editPostingInfo.categories &&
                        editPostingInfo.categories.map(({key, main_category: category}) => (
                            <option
                                key={key}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                </CategorySelection>
                {formik.touched.title && formik.errors.category ? <div>{formik.errors.category}</div> : null}
                <TagSelection name='tag'>
                    {!edit && postingInfo.length && formik.values.category &&
                    postingInfo
                        .filter(({main_category: category}) => category === formik.values.category)
                        .map(({main_category: category, value}) => (
                            value.map((v) => {
                                if (category !== '도서' || (category === '도서' && v !== '도서 추천')) {
                                    return (
                                        <label key={v} onChange={handleChange}>
                                            <TagCheckBox
                                                type='checkbox'
                                                value={v}
                                                name='tag'
                                            />
                                            {v}
                                        </label>
                                    );
                                }
                                return null;
                            })
                        ))}
                    {edit && editPostingInfo.categories && formik.values.category &&
                        editPostingInfo.categories
                            .filter(({main_category: mainCategory}) => mainCategory === formik.values.category)
                            .map(({main_category: category, value}) => (
                                value.map((v) => {
                                    if(category !== '도서' || (category === '도서' && v !== '도서 추천')) {
                                        return (
                                            <label key={v} onChange={handleChange}>
                                                <TagCheckBox
                                                    type='checkbox'
                                                    value={v}
                                                    name='tag'
                                                    defaultChecked = {editPostingInfo.selectedTags.includes(v)}
                                                />
                                                {v}
                                            </label>
                                        );
                                    }
                                    return null;
                                })
                            ))
                    }
                </TagSelection>
                <PostingContext
                    value={formik.values.posting}
                    onChange={handleChange}
                    maxLength='5000'
                    name="posting"
                />
                {formik.touched.posting && formik.errors.posting ? <div>{formik.errors.posting}</div> : null}
                <PostingLimit>{`${postingLimit}/5000`}</PostingLimit>
                <SelectImgBox>

                    <label htmlFor='posting-img'>
                        <ImgInput
                            type='file'
                            name='imgs'
                            accept='image/png, image/jpg'
                            onChange={handleChange}
                            id='posting-img'
                            multiple
                        />
                        이미지 선택:
                    </label>
                </SelectImgBox>
                <SubmitBtn type='submit' onClick={handleSubmit}>글 쓰기</SubmitBtn>
            </PostingForm>
        </PostingBox>
    );
};

Posting.defaultProps = {
    history: {},
    edit: false,
    postingId: '',
};

Posting.propTypes = {
    userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
    history: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.func,
            PropTypes.object,
        ]).isRequired,
    ),
    postingId: PropTypes.string,
    edit: PropTypes.bool,
};

export default Posting;