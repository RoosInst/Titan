import React from 'react';
import { connect } from 'react-redux';

class Part extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.partId}</p>
                <p>{this.props.result}</p>
                <p>{this.props.testTime}</p>
                <p>{this.props.cycleTime}</p>
                <p>{this.props.site}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { partNum } = ownProps;
    return {
        partId: state.data.parts_id[0] ? state.data.parts_id[0].values[partNum][0] : '--',
        result: state.data.result[0] ? state.data.result[0].values[partNum][0] : '--',
        testTime: state.data.testTime[0] ? state.data.testTime[0].values[partNum][0] : '--',
        cycleTime: state.data.cycleTime[0] ? state.data.cycleTime[0].values[partNum][0] : '--',
        site: state.data.site[0] ? state.data.site[0].values[partNum][0] : '--',
    }
    
};

export default connect(mapStateToProps)(Part);