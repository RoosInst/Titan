import React from 'react';
import { connect } from 'react-redux';

//import {useDropzone} from 'react-dropzone'
const initSqlJs = require('../sql-wasm');
import { addDb } from '../actions/db';
import { initializeHeaderData } from '../actions/headerData';
import { initializeData } from '../actions/tableData';
import { formatNextHeader } from '../functions/dataFormat';

import tableData from './tableData';


class FileObject extends React.Component {
    componentDidMount() {
                
        const inputElement = document.getElementById('input');
        inputElement.addEventListener('change', (e) => {
            const fileList = e.target.files;
            console.info(fileList);
            let file = fileList[0];
            console.info(file);
            const reader = new FileReader();
             reader.onload = (evt) => {
                console.info(evt.target.result)
                 console.info('hello')
                 let Uints = new Uint8Array(evt.target.result);
                 initSqlJs().then((SQL) => {
                    let db = new SQL.Database(Uints);
                    //const { lowestPartNumber, updateDb } = this.props;
                    console.log('connected')
                    // let res = db.exec("SELECT * FROM ritdb1");
                    //console.log(db.exec("SELECT * FROM ritdb1"));
                    this.props.addDb(db);
                    // for(let i = 0; i < 8000; i++) {
                    //     db.exec('SELECT value from ritdb1 LIMIT 1');
                    // }
                    // console.log('done')
                    // db.exec('SELECT value from ritdb1 LIMIT 8000');
                    // console.log('done')
                    //PROBABLY QUICKER NOT TO DO FOR LOOP
                    // for(let i = 2916; i < 2934; i+=2) {
                    //     test.push(i);
                    //**********testing different times of tests */
                    // let start = performance.now();
                    // db.exec("SELECT entityId FROM ritdb1 WHERE value='PART_RESULT_EVENT' AND name='ENTITY_TYPE'");
                    // let end = performance.now();
                    // console.log('FIRST TOOK ', (end - start));

                    // start = performance.now();
                    // db.exec("SELECT entityId FROM ritdb1 WHERE value='PART_RESULT_EVENT' AND name='ENTITY_TYPE' limit 100, 100");
                    // end = performance.now();
                    // console.log('SECOND TOOK ', (end - start));

                    console.log("table name", db.exec("SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name"));
                    db.exec("CREATE INDEX resultIndex ON ritdb1(name, entityID)");


                    let testNames = db.exec(`SELECT value, entityID from ritdb1 WHERE name='RESULT_NAME' limit 10`);
                    console.log('testNames', testNames)
                    // testNames[0].values.sort((first, sec) => {
                    //     return first[1] - sec[1];
                    // });

                    let testNumbers = db.exec(`SELECT value, entityID from ritdb1 WHERE name='RESULT_NUMBER' limit 10`);
                    console.log('test nums', testNumbers)
                      // testNumber[0].values.sort((first, sec) => {
                    //     return first[1] - sec[1];
                    // });

                    let testUnits = db.exec(`SELECT value from ritdb1 WHERE name='RESULT_UNITS_LABEL' limit 10`)
                    console.log("units",testUnits)

                    // let testEntityIds = db.exec(`SELECT entityId FROM ritdb1 WHERE value='PART_RESULT_EVENT' AND name='ENTITY_TYPE' limit 10`);
                    // console.log('testIds', testEntityIds);

                    let partNumbers = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit 30`);
                    console.log("part numbers", partNumbers);

                    let partOverallResult = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PF' limit 10`);
                    console.log("part result", partOverallResult);

                    let partTestTime = db.exec(`SELECT value, entityID from ritdb1 WHERE name='EVENT_TEST_TIME' limit 10`);
                    console.log("test time", partTestTime);

                    let partCycleTime = db.exec(`SELECT value, entityID from ritdb1 WHERE name='EVENT_CYCLE_TIME' limit 10`);
                    console.log("cycle time", partCycleTime);


                    let partSite = db.exec(`SELECT value, entityID from ritdb1 WHERE name='SITE_ID' limit 10`);
                    console.log("site", partSite);
                    let upcomingPartSite = db.exec(`SELECT value, entityID from ritdb1 WHERE name='SITE_ID' limit 10, 20`);
                    console.log('upcomingSite', upcomingPartSite);

                    let partTestResults = db.exec(`SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[0][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[1][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[2][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[3][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[4][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[5][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[6][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[7][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[8][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[9][1]}' AND name='R' limit 10;`);
                    console.log('part results', partTestResults);
                    let upcomingPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[10][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[11][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[12][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[13][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[14][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[15][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[16][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[17][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[18][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[19][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[20][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[21][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[22][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[23][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[24][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[25][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[26][1]}' AND name='R' limit 10;` 
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[27][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[28][1]}' AND name='R' limit 10;`
                                                + `SELECT value FROM ritdb1 WHERE EntityId='${partNumbers[0].values[29][1]}' AND name='R' limit 10;`);
                    console.log('part results', upcomingPartTestResults);

                    let headerData = {
                        partNumbers,
                        partOverallResult,
                        partTestTime,
                        partCycleTime,
                        partSite
                    }

                    let tableData = {
                        testNames,
                        testNumbers,
                        testUnits,
                        partTestResults,
                        upcomingPartTestResults
                    };

                    this.props.initializeHeaderData(headerData);
                    this.props.initializeData(tableData);
                    

                    // testResults[i] = currentResults;

                    // if(i == 2916) {
                        // testIndex = db.exec(`SELECT indexId from ritdb1 WHERE EntityId='${i}' AND name='R' AND (value2='PV' OR value2='FV')`)[0].values;

                    

                    

                    

                   
                 
                    // }
                // }
                    // console.log('tests', test)

                    // console.log('test results', testResults);
                    //console.log('test results', testResults);
                    //console.log('test index', testIndex);
                    //this.props.addTest(test, testResults, testNames, partsID, result, testTime, cycleTime, site);
                    //console.log('test names', testNames);
                    // let data = [];
                    // for(let j = 0; j < testNames[0].values.length; j++) {
                    //     data.push({
                    //         testName: testNames[0].values[j][0],
                    //         units: testUnits[0].values[j][0],
                    //         testNum: testNumbers[0].values[j][0],
                    //         data0: partTestResults[0].values[j][0],
                    //         data1: partTestResults[1].values[j][0],
                    //         data2: partTestResults[2].values[j][0],
                    //         data3: partTestResults[3].values[j][0],
                    //         data4: partTestResults[4].values[j][0],
                    //         data5: partTestResults[5].values[j][0],
                    //         data6: partTestResults[6].values[j][0],
                    //         data7: partTestResults[7].values[j][0],
                    //         data8: partTestResults[8].values[j][0],
                    //     });
                    // }
                    // console.log(data);
                    // this.props.updateData(data);
               })
             }
            reader.readAsArrayBuffer(file);
        }, false);
    }

    //formatted data
    //header information
    
   
    render() {
        return (
            <div>
                <label htmlFor='input' className="add-file">Click here to upload database</label>
                <input type='file' id='input' accept='.sqlite,.ritdb' />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lowestPartNumber: state.tableData.lowestPartNumber  
})
      
export default connect(mapStateToProps, { addDb, initializeHeaderData, initializeData })(FileObject);



// STRUCTURE
// start with 20 extra in front
// when someone clicks next part, get the 21st part
//     the part that was left goes into previous parts until it is full
// DO WE WANT TO IMPLEMENT A SCROLL BAR?!??!
//     HOW WOULD WE IMPLMENT A SCROLL BAR?!?!??!
//INDEXING??????