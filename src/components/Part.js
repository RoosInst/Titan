import React from 'react';
import { connect } from 'react-redux';

class Part extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.partNumber}</p>
                <p>{this.props.partOverallResult}</p>
                <p>{this.props.partTestTime}</p>
                <p>{this.props.partCycleTime}</p>
                <p>{this.props.partSite}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { partNum } = ownProps;
    return {
        partNumber: state.headerData.partNumbers[0] ? state.headerData.partNumbers[0].values[partNum][0] : '--',
        partOverallResult: state.headerData.partOverallResult[0] ? state.headerData.partOverallResult[0].values[partNum][0] : '--',
        partTestTime: state.headerData.partTestTime[0] ? state.headerData.partTestTime[0].values[partNum][0] : '--',
        partCycleTime: state.headerData.partCycleTime[0] ? state.headerData.partCycleTime[0].values[partNum][0] : '--',
        partSite: state.headerData.partSite[0] ? state.headerData.partSite[0].values[partNum][0] : '--',
    }
};

export default connect(mapStateToProps)(Part);