import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingReducer from './listingReducer';
import modalReducer from './modalReducer';

export default combineReducers({
// add your reducers here
    userReducer,
    listingReducer,
    modalReducer,
});
