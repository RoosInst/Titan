import { combineReducers } from 'redux';
import Data from './reducer_data';

const rootReducer = combineReducers({
    data: Data
});

export default rootReducer;