import React from 'react';
import FileData from './FileData';
import TabBar from './TabBar';
import './../styles/styles.scss';
export default class App extends React.Component {
    render() {
        console.log('App is running');
        return (
            <div>
                <FileData />
                <TabBar />
            </div>
        );
    }  
};