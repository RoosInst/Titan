import React from 'react';
import { connect } from 'react-redux';
import { addData } from '../actions/verifiesData';
import VerifiesTable from './VerifiesTable';

function Verifies(props) {
    const { addData } = props;
    if(props.db.db != undefined)
    {
        let i,j,ULval,LLval,failCount = 0;
        let inData = [];
        let data = [];
        let PorF = "Pass";
        let inPorF;
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
        let resNums = db.exec(`SELECT value from ritdb1 WHERE name='RESULT_NUMBER'`);
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
            inPorF = "pass";
            if(ULval == null && LLval == null)
            {
                continue;
            }
            else if(Data[0].values[i][0] > ULval || Data[0].values[i][0] < LLval)
            {
                console.log("Failed at",Data[0].values[i][0],ULval,LLval);
                PorF = "Fail";
                inPorF = "Fail";
                failCount++;
            }
            inData.unshift(
                {
                    resNum: resNums[0].values[i],
                    ul: ULval,
                    ll: LLval,
                    datapt: Data[0].values[i][0],
                    porf: inPorF,
                }
            );
        }
        let count = 0;
        data.push(
            {
                id: count++,
                device: 1,
                result: PorF,
                NoF: failCount,
                inData
            }
        );
        console.log("data: ",data[0]);
        addData(data[0], inData);
        return <VerifiesTable />
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
    return {
      db: state.db,
    }
  }
  
  export default connect(mapStateToProps, { addData })(Verifies);