import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { tableScroll } from '../actions/tableData';
import { headerScroll } from '../actions/headerData';
import SimpleBar from 'simplebar-react';

import '../../node_modules/simplebar/dist/simplebar.min.css';

const Scrollbar = (props) => {
    const allowQuery = useRef(true);
    const previosPosition = useRef(0);
    const [width, setWidth] = useState(100);

    useEffect(() => {
        const windowWidth = document.getElementById("scroll-container").offsetWidth;
        const newWidth = 100 + ((1875 / windowWidth) * 100);
        //console.log(newWidth);
        setWidth(newWidth);
    }, []);

    let resize;
    window.addEventListener('resize', function(event){
        this.clearTimeout(resize);
        resize = setTimeout(() => {
            const windowWidth = document.getElementById("scroll-container").offsetWidth;
            const newWidth = 100 + ((1875 / windowWidth) * 100);
            //console.log(newWidth);
            setWidth(newWidth);
        }, 600);
    });

    const onDrag = (event) => {
        if(!allowQuery.current) {
            return;
        } else {
            allowQuery.current = false;
            setTimeout(() => {
                allowQuery.current = true;
            }, 10);
            let deltaPosition = event.target.scrollLeft - previosPosition.current;
            previosPosition.current = event.target.scrollLeft;
            
            let start = performance.now();
            const { db, nextPartNumber, prevPartNumber } = props;
            const actualNextPartNumber = nextPartNumber + deltaPosition;
            const actualPrevPartNumber = prevPartNumber + deltaPosition;
            console.log(actualNextPartNumber);
            console.log("onDrag Nums:",prevPartNumber,nextPartNumber);
            //***************************************************
            //THIS SECTION WILL BE USED WHEN MAKING A SCROLL BAR FOR THE BASE
            // let testNames = db.exec(`SELECT value, entityID from ritdb1 WHERE name='RESULT_NAME' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            // console.log('testNames', testNames);

            // let testNumbers = db.exec(`SELECT value, entityID from ritdb1 WHERE name='RESULT_NUMBER' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            // console.log('test nums', testNumbers);

            // let testUnits = db.exec(`SELECT value from ritdb1 WHERE name='RESULT_UNITS_LABEL' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`)
            // console.log("units",testUnits)

            // let testEntityIds = db.exec(`SELECT entityId FROM ritdb1 WHERE value='PART_RESULT_EVENT' AND name='ENTITY_TYPE' limit 10`);
            // console.log('testIds', testEntityIds);
            ////***************************************************

            let partNumbers = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            console.log("part numbers", partNumbers);

            let partOverallResult = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PF' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            console.log("part result", partOverallResult);

            let partTestTime = db.exec(`SELECT value, entityID from ritdb1 WHERE name='EVENT_TEST_TIME' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            console.log("test time", partTestTime);

            let partCycleTime = db.exec(`SELECT value, entityID from ritdb1 WHERE name='EVENT_CYCLE_TIME' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            console.log("cycle time", partCycleTime);

            let partSite = db.exec(`SELECT value, entityID from ritdb1 WHERE name='SITE_ID' order by name LIMIT 10 OFFSET ${actualNextPartNumber}`);
            console.log("site", partSite);

            let partTestResults = db.exec(`SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[0][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[1][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[2][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[3][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[4][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[5][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[6][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[7][1]}' AND name='R' order by name LIMIT 10;` 
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[8][1]}' AND name='R' order by name LIMIT 10;`
                                        + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[9][1]}' AND name='R' order by name LIMIT 10;`);
            console.log('part results', partTestResults);

            let headerData = {
                partNumbers,
                partOverallResult,
                partTestTime,
                partCycleTime,
                partSite
            }

            let tableData = {
                // testNames,
                // testNumbers,
                // testUnits,
                partTestResults,
            };

            props.headerScroll(headerData);
            props.tableScroll(tableData, actualNextPartNumber, actualPrevPartNumber);

            let end = performance.now();
            console.log('FIRST TOOK ', (end - start));
            console.log('CURRENT POSITION', event.target.scrollLeft);
            console.log('DELTA POSITION', deltaPosition);
        }
    }
    
    // console.log(window.innerWidth)
    console.log('WIDTH', width)
    return (    
        
        //GET THE WIDTH OF THE CONTAINER HOLDING THE SCROLLBAR, THEN CALCULATE PERCENTAGE BASED ON THIS WIDTH
        <div id="scroll-container" onScroll={onDrag} style={{width: '100%', overflow: 'scroll'}}> 
            <p id="p" style={{width: `${width}%`}}>.</p>
        </div>
        
    
        
        // <div style={{height: '20px', width: '100%', backgroundColor: "white", position:"relative"}}>
        //     <Draggable
        //         axis="x"
        //         bounds="parent"
        //         grid={[.1,.1]}
        //         scale={1}
        //         onDrag={onDrag}
        //     >
        //         <div style={{backgroundColor: "gray", width:"10px", height:"20px"}}></div>
        //     </Draggable> 
        // </div>
    );
}


// class Scrollbar extends Component {
//     shouldComponentUpdate() {
//         return false;
//     }
//     onDrag = (event, data) => {
//         //********************************* 
//         //plan on what to do about the lag
//         //  - use set timeout with a 10ms delay
//         //  - have a variable allowQueries 
//         //  - have onDrag check if allowQueries is true
//         //      - if false: return from function
//         //      - if true: set it to false, set timeout to make it true, then make your query





//       const { db, nextPartNumber, nextPart, nextHeader } = this.props;
//       let start = performance.now();
//       // Current Time: 360 - 370
//       console.log(nextPartNumber);
//       //console.log("results", db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND EntityId='2912'`));
//       let test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
//       test.step();
//       let nextPartNumberResult = test.get()[1];
//       let nextPartNumberHeader = test.get();
//       console.log('next part num', nextPartNumberResult);
//       console.log('next part header num', nextPartNumberHeader);

//       // test = db.prepare(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}'`);
//       // test.step();
//       let nextPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}' limit 10`);
//       console.log(nextPartTestResults);

//       //console.log(nextPart);
//       test = db.prepare(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${nextPartNumberResult}'`);
//       test.step();
//       let nextPartResult = test.get();
//       console.log(nextPartResult);
//       //console.log(test.get());
//       test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${nextPartNumberResult}'`);
//       test.step();
//       let nextPartTestTime = test.get();

//       //console.log(test.get());
//       test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${nextPartNumberResult}'`);
//       test.step();
//       let nextPartCycleTime = test.get();

//       //console.log(test.get());
//       test = db.prepare(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${nextPartNumberResult}'`);
//       test.step();
//       let nextPartSiteId = test.get();
//       //console.log(test.get());
//       //nextPart(nextPartTestResults);

//       let newHeaderData = {
//         nextPartNumber,
//         newPartNumber: nextPartNumberHeader,
//         newPartOverallResult: nextPartResult[0],
//         newPartTestTime: nextPartTestTime[0],
//         newPartCycleTime: nextPartCycleTime[0],
//         newPartSite: nextPartSiteId[0]
//       };
//       //nextHeader(newHeaderData);
//       setTimeout(() => {
//         nextPart(nextPartTestResults); 
//         nextHeader(newHeaderData);
//     });
    

//       // let newPartNumber = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
//       // console.log(newPartNumber);
//       // let newPartTestResult = db.exec(`SELECT value FROM ritdb1 WHERE entityID='${newPartNumber[0].values[0][1]}' AND name='R' limit 10;`);
//       // console.log('newPartInfo', newPartTestResult)
    
//       // let result = db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`);
//       // let newHeaderData = {
//       //   newPartNumber,
//       //   newPartOverallResult: db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`),
//       //   newPartTestTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
//       //   newPartCycleTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
//       //   newPartSite: db.exec(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${newPartNumber[0].values[0][1]}'`),
//       // }
//       let end = performance.now();
//       console.log('FIRST TOOK ', (end - start));
//       // nextPart(newPartTestResult);
//       // nextHeader(newHeaderData);
      
      
//       // console.log(props);
//       // const { testNames, testResults, partNumbers, currentPart, db, data } = props;
//       // console.log(testResults);
//       // let newEntry = db.exec(`SELECT value, indexId FROM ritdb1 WHERE EntityId='${partNumbers[0].values[currentPart][0]}' AND name='R';`);
//       // console.log("newEntry", newEntry);
//       // console.log(data);
//       // let newData = [];
//       // for(let j = 0; j < testNames[0].values.length; j++) {
//       //   newData.push({
//       //       testName: testNames[0].values[j][0],
//       //       units: data[j].units,
//       //       testNum: data[j].testNum,
//       //       data0: data[j].data1,
//       //       data1: data[j].data2,
//       //       data2: data[j].data3,
//       //       data3: data[j].data4,
//       //       data4: data[j].data5,
//       //       data5: data[j].data6,
//       //       data6: data[j].data7,
//       //       data7: data[j].data8,
//       //       data8: newEntry[0].values[j][0],
//       //   });
//       // }
//       // console.log(data);
//       // props.updateData(newData);
//       // props.nextPart();
//     }

//     render() {
//         //console.log('rendering');
//         const { nextPartNumber } = this.props;

//         return (    
//             <div style={{height: '20px', width: '100%', backgroundColor: "white", position:"relative"}}>
//                 <Draggable
//                     axis="x"
//                     bounds="parent"
//                     grid={[.5,.5]}
//                     onDrag={this.onDrag}
//                 >
//                     <div style={{backgroundColor: "gray", width:"20px", height:"20px"}}></div>
//                 </Draggable> 
//             </div>
//         );
//     }
// }

const mapStateToProps = (state) => ({
    db: state.db,
    nextPartNumber: state.tableData.nextPartNumber,
    prevPartNumber: state.tableData.prevPartNumber,
});

export default connect(mapStateToProps, { tableScroll, headerScroll })(Scrollbar);