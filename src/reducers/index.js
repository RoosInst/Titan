import { combineReducers } from 'redux';
import Data from './reducer_data';
import Db from './reducer_db';

const rootReducer = combineReducers({
    data: Data,
    db: Db,
});

export default rootReducer;