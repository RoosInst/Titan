import React from 'react';
import { connect } from 'react-redux';

class Part extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.partId}</p>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { partNum } = ownProps;
    return {
        partId: state.data.parts_id[0] ? state.data.parts_id[0].values[partNum][0] : 'Nothing'
    }
    
};

export default connect(mapStateToProps)(Part);