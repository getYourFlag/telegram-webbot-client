import authReducer from './auth';
import botReducer from './bot';
import chatReducer from './chat';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer, botReducer, chatReducer
});

export default allReducers;