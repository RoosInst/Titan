import React from 'react';
import { connect } from 'react-redux';

function Statistics(props) {
        const data = props.data;
        let i,countPass = 0,countFail = 0,avgTime = 0,timeCount = 0;
        for(i=0;i<data.length;i++)
        {
            if(data[i].value == 'PASS' && data[i].name == 'PF')
            {
                countPass++;
            }
            if(data[i].value == 'FAIL' && data[i].name == 'PF')
            {
                countFail++;
            }
            if(data[i].name == 'EVENT_TEST_TIME')
            {
                avgTime = avgTime + data[i].value;
                timeCount++;
            }
        }
        avgTime = avgTime/timeCount;
        return (
            <div>
                <h3>Passed:</h3>
                {countPass}
                <h3>Failed:</h3>
                {countFail}
                <h3>Average Event Test Time:</h3>
                {avgTime}
            </div>
        );
}

function mapStateToProps(state) {
    console.log('in func',state.data);
    return {
      data: state.data
    }
  }
  
  export default connect(mapStateToProps, { })(Statistics);