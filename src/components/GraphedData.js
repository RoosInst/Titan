import React from 'react';
import { connect } from 'react-redux';
import { CoordinateLineChart, DonutChart, LineChart } from 'amazing-react-charts';

function GraphedData(props) {
    if(props.db.db != undefined)
    {
        const db = props.db;
        let allData = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`);
        let passData = db.exec(`SELECT value FROM ritdb1 WHERE value='PASS' AND name='PF'`);
        let failData = db.exec(`SELECT value FROM ritdb1 WHERE value='FAIL' AND name='PF'`);
        passData = passData[0].values.length;
        failData = failData[0].values.length;
        let totalTest = passData + failData;
        let ppass = (passData/totalTest)*100;
        let pfail = (failData/totalTest)*100;
        allData = allData[0].values.flat(1);
        console.log(allData.slice(0,10));
        return (
            <div>
                <DonutChart
                    noAnimation
                    colors={['green', 'red']}
                    legendPosition="outside"
                    center={['50%', '50%']}
                    donutRadius={['40%', '70%']}
                    data={[
                        { name: 'Passed', value: ppass.toFixed(1) },
                        { name: 'Failed', value: pfail.toFixed(1) },
                    ]}
                />
            </div>
        );
    }
    else
    {
        return (
            <div>
                <h3>Please upload file</h3>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('in func',state.data);
    return {
      db: state.db
    }
  }
  
  export default connect(mapStateToProps, {})(GraphedData);