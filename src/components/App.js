import React from 'react';
import BuildTable from './BuildTable';
import FileData from './FileData';
export default class App extends React.Component {
    render() {
        console.log('App is running');
        return (
            <div>
                <FileData />,
                <BuildTable />
            </div>
        );
    }  
};