import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from "styled-components";

const LetterBox = styled.section`
  height: 70px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
`;

const LetterTitle = styled.h4``;

const LetterCategory = styled.p`
    margin-bottom: 10px;
`;

const LetterList = ({id, title, mainCategory}) => {
    return (
        <LetterBox key={id}>
            <LetterTitle><Link to={`/letter/${id}`}>{title}</Link></LetterTitle>
            <LetterCategory>{mainCategory}</LetterCategory>
        </LetterBox>
    );
};

LetterList.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    mainCategory: PropTypes.string.isRequired,
};

export default LetterList;