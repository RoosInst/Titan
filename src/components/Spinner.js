import React from 'react';
import 'regenerator-runtime/runtime';
import styled from "styled-components";
import Loader from 'react-loader-spinner';

export default class Spinner extends React.Component {
    render() {
        const Spinner = styled.div`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        `;
        return (
            <Spinner>
                <Loader
                    type="Puff"
                    color="#2e353d"
                />
            </Spinner>
        );

    }
}