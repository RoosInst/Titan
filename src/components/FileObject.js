import React from 'react';
import { connect } from 'react-redux';

//import {useDropzone} from 'react-dropzone'
const initSqlJs = require('../sql-wasm');
import { updateData, updateDb } from '../actions';
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
                    console.log('connected')
                    // let res = db.exec("SELECT * FROM ritdb1");
                    //console.log(db.exec("SELECT * FROM ritdb1"));
                    this.props.updateDb(db);
                    let testNames = [];
                    let testIndex = [];
                    let testResults = {};
                    let currentResults;
                    let test;
                    let data =[];
                    // for(let i = 0; i < 8000; i++) {
                    //     db.exec('SELECT value from ritdb1 LIMIT 1');
                    // }
                    // console.log('done')
                    // db.exec('SELECT value from ritdb1 LIMIT 8000');
                    // console.log('done')
                    //PROBABLY QUICKER NOT TO DO FOR LOOP
                    // for(let i = 2916; i < 2934; i+=2) {
                    //     test.push(i);
                    test = db.exec(`SELECT entityId FROM ritdb1 WHERE value='PART_RESULT_EVENT' AND name='ENTITY_TYPE'`);

                        testResults = db.exec(`SELECT value, indexId FROM ritdb1 WHERE EntityId='2898' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2902' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2904' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2906' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2908' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2910' AND name='R';` + `SELECT value, indexId FROM ritdb1 WHERE EntityId='2912' AND name='R';`);
                        // testResults[i] = currentResults;

                        // if(i == 2916) {
                            // testIndex = db.exec(`SELECT indexId from ritdb1 WHERE EntityId='${i}' AND name='R' AND (value2='PV' OR value2='FV')`)[0].values;
                            
                        testNames = db.exec(`SELECT trim(value) from ritdb1 WHERE name='RESULT_NAME' GROUP BY trim(value)`)
                        // }
                    // }
                    console.log('tests', test)

                    console.log('test results', testResults);
                    //console.log('test results', testResults);
                    //console.log('test index', testIndex);
                    console.log('test names', testNames);

                    for(let j = 0; j < testNames[0].values.length; j++) {
                        data.push({
                            testName: testNames[0].values[j][0],
                            data1: testResults[0].values[j][0],
                            data2: testResults[1].values[j][0],
                            data3: testResults[2].values[j][0],
                            data4: testResults[3].values[j][0],
                            data5: testResults[4].values[j][0],
                            data6: testResults[5].values[j][0],
                            data7: testResults[6].values[j][0],
                        });
                    }
                    console.log(data);
                    this.props.updateData(data);
               })
             }
            reader.readAsArrayBuffer(file);

        
        }, false);
       
    }
    
   
    render() {
        return (
            <div>
                <label htmlFor='input' className="add-file">Click here to upload database</label>
                <input type='file' id='input' accept='.sqlite,.ritdb' />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
  }
      
export default connect(mapStateToProps, {updateData, updateDb})(FileObject);
