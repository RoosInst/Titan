import React from 'react';
//import {useDropzone} from 'react-dropzone'
const initSqlJs = require('../sql-wasm');

export default class FileDate extends React.Component {
    componentDidMount() {
                
         const inputElement = document.getElementById('input');
        inputElement.addEventListener('change', handleFile, false);
        function handleFile() {
            const fileList = this.files;
            console.info(fileList);
            let file = fileList[0];
            console.info(file);
            const reader = new FileReader();
             reader.onload = function(evt) {
                console.info(evt.target.result)
                 console.info('hello')
                 let Uints = new Uint8Array(evt.target.result);
                 initSqlJs().then(function(SQL){
                      let db = new SQL.Database(Uints);
                      console.log('connected')

                   let res = db.exec("SELECT * FROM ritdb1");
                     console.log(res);  
               })
             }
            reader.readAsArrayBuffer(file);
        }
    }
    
    render() {
        return (
            <div>
                <p>test</p>
                <input type='file' id='input' />
            </div>
        )
    }
}


