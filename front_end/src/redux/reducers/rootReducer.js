import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingReducer from './listingReducer';
import modalReducer from './modalReducer';
import inquiryReducer from './inquiryReducer';
import mainDisplayReducer from './mainDisplayReducer';

export default combineReducers({
// add your reducers here
    userReducer,
    listingReducer,
    modalReducer,
    inquiryReducer,
    mainDisplayReducer,
});
