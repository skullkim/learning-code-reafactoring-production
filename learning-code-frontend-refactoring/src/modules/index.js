import {combineReducers} from 'redux';

import authReducer from "./auth";
import searchReducer from './search';

const rootReducer = combineReducers({
    searchReducer,
    authReducer,
});

export default rootReducer;