import PropType from 'prop-types';
import styled from "styled-components";

const BookBox = styled.section`
  height: 150px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BookInfo = styled.section`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const BookTitle = styled.h4`
  margin: 0;
`;

const BookImage = styled.img`
  height: 100px;
  width: 70px;
`;

const BookIntroduction = styled.div`
  height: 100px;
  width: 100%;
  margin-left: 10px;
`;

const BookAuthors = styled.h5`
  margin-top: 0;
  margin-bottom: 5px;
`;

const BookContents = styled.p`
    margin: 0;
`;

const BookList = ({authors, contents, title, thumbnail, url}) => {
    return (
        <BookBox key={url}>
            <BookTitle><a href={url}>{title}</a></BookTitle>
            <BookInfo>
                <BookImage src={thumbnail} alt={`${title} thumbnail`}/>
                <BookIntroduction>
                    <BookAuthors>{authors && authors.map(author => `${author}, `)}</BookAuthors>
                    <BookContents>{contents}</BookContents>
                </BookIntroduction>
            </BookInfo>
        </BookBox>
    );
};

BookList.propTypes = {
    authors: PropType.arrayOf(PropType.string).isRequired,
    contents: PropType.string.isRequired,
    title: PropType.string.isRequired,
    thumbnail: PropType.string.isRequired,
    url: PropType.string.isRequired,
};

export default BookList;