import React from 'react';
import { connect } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';

function GraphedData(props) {
    if(props.db.db != undefined)
    {
        const db = props.db;
        let allData = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`);
        let passData = db.exec(`SELECT value FROM ritdb1 WHERE value='PASS' AND name='PF'`);
        let failData = db.exec(`SELECT value FROM ritdb1 WHERE value='FAIL' AND name='PF'`);
        console.log("Pass!",passData);
        let ppass = passData[0].values.length;
        let pfail = failData[0].values.length;
        let totalTest = ppass + pfail;
        ppass = (ppass/totalTest)*100;
        pfail = (pfail/totalTest)*100;
        const doughnutData = {
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
          const lineData = {
            label: 'Tests',
            datasets: [
              {
                label: 'Pass Values',
                data: passData[0].values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Fail Values',
                data: failData[0].values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          };
        allData = allData[0].values.flat(1);
        console.log(allData.slice(0,10));
        return (
            <div className="over-div">
                <Doughnut 
                    data={doughnutData}
                    width="300"
                    height="300"
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                    }}
                />
                <Line
                    data={lineData}
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