import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listingReducer from './listingReducer';

export default combineReducers({
// add your reducers here
    userReducer,
    listingReducer,
});
