import { combineReducers } from 'redux';
import db from './reducer_db';
import headerData from './reducer_headerData';
import tableData from './reducer_tableData';


const rootReducer = combineReducers({
    db,
    headerData,
    tableData
});

export default rootReducer;