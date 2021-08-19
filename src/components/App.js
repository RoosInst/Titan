import React from 'react';
import 'regenerator-runtime/runtime';
import FileData from './FileData';
import TabBar from './TabBar';
import styled from "styled-components";
import Loader from 'react-loader-spinner';
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
        const Spinner = styled.div`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        `;
        if(this.state.loading) {
            return (
            <Spinner>
                <Loader
                    type="Puff"
                    color="#2e353d"
                />
            </Spinner>
            );
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