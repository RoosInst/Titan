import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

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
        const data = {
            labels: ['Passed', 'Failed'],
            datasets: [
              {
                label: 'Pass/Fail',
                data: [ppass, pfail],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };
        allData = allData[0].values.flat(1);
        console.log(allData.slice(0,10));
        return (
            <div className="over-div">
                <Doughnut 
                    data={data}
                    width="300"
                    height="300"
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                    }}
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