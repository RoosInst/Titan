import React from 'react';
import { connect } from 'react-redux';

function Verifies(props) {
    if(props.db.db != undefined)
    {
        const db = props.db;
        let UL;
        let LL;
        let Data;
        return (
            <div>
                
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
  
  export default connect(mapStateToProps, {})(Verifies);