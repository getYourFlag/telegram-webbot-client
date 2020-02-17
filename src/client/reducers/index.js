import authReducer from './auth';
import channelListReducer from './channels';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    authReducer, channelListReducer
});

export default allReducers;