import React from 'react';
import { connect } from 'react-redux';

//import {useDropzone} from 'react-dropzone'
const initSqlJs = require('../sql-wasm');
import { updateData } from '../actions';
class FileData extends React.Component {
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

                    let res = db.exec("SELECT * FROM ritdb1");
                    this.props.updateData(res);
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
      
  export default connect(mapStateToProps, {updateData})(FileData);
