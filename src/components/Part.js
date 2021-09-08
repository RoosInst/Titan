import React from 'react';

export default class Part extends React.Component {
    state = {Number: 0,Result: 0,Test: 0,Cycle: 0,Site: 0};
    render() {
        return (
            <div>
                <p>{this.props.Number}</p>
                <p>{this.props.Result}</p>
                <p>{this.props.Test}</p>
                <p>{this.props.Cycle}</p>
                <p>{this.props.Site}</p>
            </div>
        )
    }
}