import React from 'react';
import TestTable from './TestTable';
import FileData from './FileData';
export default class Test extends React.Component {
    render() {
        console.log('Test is running');
        return (
            <div>
                <FileData />,
                <TestTable />
            </div>
        );
    }  
};