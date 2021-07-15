import React from 'react';
import TestTable from './TestTable';
export default class Test extends React.Component {
    render() {
        console.log('Test is running');
        return (
            <TestTable />
        );
    }  
};