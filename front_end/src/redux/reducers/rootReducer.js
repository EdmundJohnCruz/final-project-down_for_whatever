import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingReducer from './listingReducer';
import modalReducer from './modalReducer';
import inquiryReducer from './inquiryReducer';

export default combineReducers({
// add your reducers here
    userReducer,
    listingReducer,
    modalReducer,
    inquiryReducer,
});
