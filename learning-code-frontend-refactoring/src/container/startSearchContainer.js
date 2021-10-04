import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {search} from '../modules/search';
import SearchResult from "../pages/SearchResult";


const SearchResultContainer = ({search: searchTarget}) => {
    return <SearchResult search={searchTarget} />
}

SearchResultContainer.propTypes = {
    search: PropTypes.func.isRequired,
};

export const SearchResultPage = connect(
    () => ({}),
    {
        search,
    }
)(SearchResultContainer);
