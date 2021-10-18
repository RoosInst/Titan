import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { nextPart } from '../actions/tableData';
import { nextHeader } from '../actions/headerData';

class Scrollbar extends Component {
    onDrag = (event, data) => {
        console.log(data);
        const { db, nextPartNumber, nextPart, nextHeader } = this.props;
        let start = performance.now();
        // Current Time: 360 - 370
        console.log(nextPartNumber);
        //console.log("results", db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND EntityId='2912'`));
        let test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
        test.step();
        let nextPartNumberResult = test.get()[1];
        console.log(nextPartNumberResult)

        // test = db.prepare(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}'`);
        // test.step();
        let nextPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}' limit 10`);
        console.log(nextPartTestResults);

        //console.log(nextPart);
        test = db.prepare(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${nextPartNumberResult}'`);
        test.step();
        let nextPartResult = test.get();
        console.log(nextPartResult);
        //console.log(test.get());
        test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${nextPartNumberResult}'`);
        test.step();
        let nextPartTestTime = test.get();

        //console.log(test.get());
        test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${nextPartNumberResult}'`);
        test.step();
        let nextPartCycleTime = test.get();

        //console.log(test.get());
        test = db.prepare(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${nextPartNumberResult}'`);
        test.step();
        let nextPartSiteId = test.get();
        //console.log(test.get());
        nextPart(nextPartTestResults);

        let newHeaderData = {
        nextPartNumber,
        newPartNumber: nextPartNumberResult[0],
        newPartOverallResult: nextPartResult[0],
        newPartTestTime: nextPartTestTime[0],
        newPartCycleTime: nextPartCycleTime[0],
        newPartSite: nextPartSiteId[0]
        };
        nextHeader(newHeaderData);

        // let newPartNumber = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
        // console.log(newPartNumber);
        // let newPartTestResult = db.exec(`SELECT value FROM ritdb1 WHERE entityID='${newPartNumber[0].values[0][1]}' AND name='R' limit 10;`);
        // console.log('newPartInfo', newPartTestResult)

        // let result = db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`);
        // let newHeaderData = {
        //   newPartNumber,
        //   newPartOverallResult: db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`),
        //   newPartTestTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
        //   newPartCycleTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
        //   newPartSite: db.exec(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${newPartNumber[0].values[0][1]}'`),
        // }
        let end = performance.now();
        console.log('FIRST TOOK ', (end - start));
        // nextPart(newPartTestResult);
        // nextHeader(newHeaderData);
        
        
        // console.log(props);
        // const { testNames, testResults, partNumbers, currentPart, db, data } = props;
        // console.log(testResults);
        // let newEntry = db.exec(`SELECT value, indexId FROM ritdb1 WHERE EntityId='${partNumbers[0].values[currentPart][0]}' AND name='R';`);
        // console.log("newEntry", newEntry);
        // console.log(data);
        // let newData = [];
        // for(let j = 0; j < testNames[0].values.length; j++) {
        //   newData.push({
        //       testName: testNames[0].values[j][0],
        //       units: data[j].units,
        //       testNum: data[j].testNum,
        //       data0: data[j].data1,
        //       data1: data[j].data2,
        //       data2: data[j].data3,
        //       data3: data[j].data4,
        //       data4: data[j].data5,
        //       data5: data[j].data6,
        //       data6: data[j].data7,
        //       data7: data[j].data8,
        //       data8: newEntry[0].values[j][0],
        //   });
        // }
        // console.log(data);
        // props.updateData(newData);
        // props.nextPart();
    }

    render() {
        console.log('renering');
        return (    
            <div style={{height: '20px', width: '100%', backgroundColor: "white", position:"relative"}}>
                <Draggable
                    axis="x"
                    bounds="parent"
                    grid={[3,3]}
                    onDrag={this.onDrag}
                >
                    <div style={{backgroundColor: "gray", width:"20px", height:"20px"}}></div>
                </Draggable> 
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    db: state.db,
    nextPartNumber: state.tableData.nextPartNumber
});

export default connect(mapStateToProps, { nextPart, nextHeader })(Scrollbar);