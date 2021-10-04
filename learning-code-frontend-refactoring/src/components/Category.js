import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const CategoryBox = styled.aside`
  height: auto;
  width: 200px;
  border-right: 1px solid gray;
`;

const ACategory = styled.div`
  width: 200px;
  margin-top: 10px;
  margin-left: 20px;
`;

const MainCategory = styled.dt`
  font-size: 18px;
  font-weight: bold;
`;

const SubCategory = styled.dd`
  font-size: 15px;
  font-weight: normal;
`;

const Category = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/letters/categories`)
            .then(({data: {data}}) => {
                setCategory(data);
            })
            .catch((err) => err);
    }, []);

    return (
        <>
            <CategoryBox>
                {category && category.map(({key, main_category: mainCategory, value}) => (
                    <ACategory key={key}>
                        <MainCategory>
                            <Link to={`/search/category?query=${mainCategory}`}>{mainCategory}</Link>
                        </MainCategory>
                        {value.map(subCategory => (
                            <SubCategory key={subCategory}>
                                {key === 'book' && subCategory === '도서 추천' ?
                                    <Link to='/search/book?query=프로그래밍'>{subCategory}</Link> :
                                    <Link to={`/search/category?query=${subCategory}`}>{subCategory}</Link>
                                }
                            </SubCategory>
                        ))}
                    </ACategory>
                ))}
            </CategoryBox>
        </>
    );
}

export default Category;