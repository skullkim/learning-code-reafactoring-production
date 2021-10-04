const SEARCH = 'search/START_SEARCH';

export const search = (startSearch) => ({
    type: SEARCH,
    startSearch
});

const initialState = {
    startSearch: false,
};
function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH:
            return {
                startSearch: action.startSearch
            }
        default :
            return state;
    }
}

export default searchReducer;