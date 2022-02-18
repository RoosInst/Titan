import React from 'react';
import { connect } from 'react-redux';

function Verifies(props) {
    if(props.db.db != undefined)
    {
        let i,j,ULval,LLval;
        let PorF = "Pass";
        const db = props.db;
        let UL = db.exec(`SELECT value, indexID from ritdb1 WHERE name='UL'`);
        console.log("UpperLimit", UL);
        if(UL)
        {
            UL = UL[0].values;
        }
        let LL = db.exec(`SELECT value, indexID from ritdb1 WHERE name='LL'`);
        console.log("LowerLimit", LL);
        if(LL)
        {
            LL = LL[0].values;
        }
        let Data = db.exec(`SELECT value, indexID from ritdb1 WHERE name='R'`);
        console.log("VerifyData",Data);
        for(i=0;i<Data[0].values.length;i++)
        {
            ULval = null;
            LLval = null;
            for(j=0;j<UL.length;j++)
            {
                if(UL && UL[j][1] == Data[0].values[i][1])
                {
                    ULval = UL[j][0];
                }
                if(LL && LL[j][1] == Data[0].values[i][1])
                {
                    LLval = LL[j][0];
                }
            }
            if(ULval == null && LLval == null)
            {
                continue;
            }
            else if(Data[0].values[i][0] > ULval || Data[0].values[i][0] < LLval)
            {
                console.log("Failed at",Data[0].values[i][0],ULval,LLval);
                PorF = "Fail";
                break;
            }
        }
        if(PorF == "Pass")
        {
            return (
                <div>
                    <p className='PorF-P'>{PorF}</p>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <p className='PorF-F'>{PorF}</p>
                    <p className='F-note'>Failed at Data point: {Data[0].values[i][0]} with UL: {ULval} and LL: {LLval}</p>
                </div>
            );
        }
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