import { combineReducers } from 'redux';
import db from './reducer_db';
import headerData from './reducer_headerData';
import tableData from './reducer_tableData';
import verifyTable from './reducer_verifies';

const rootReducer = combineReducers({
    db,
    headerData,
    tableData,
    verifyTable,
});

export default rootReducer;