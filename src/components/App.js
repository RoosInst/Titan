import React from 'react';
import 'regenerator-runtime/runtime';
import FileData from './FileData';
import TabBar from './TabBar';
import Spinner from './Spinner';
import './../styles/styles.scss';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    async loadData() {
        const data = this.setState({
            loading: false
        })
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        console.log('App is running');
        if(this.state.loading) {
            return (
                <Spinner />
            )
        }
        else {
            return (
                <div>
                    <FileData />
                    <TabBar />
                </div>
            );
        }
    } 
};