import React from 'react';
import { connect } from 'react-redux';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { addData } from '../actions/verifiesData';

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
        
        const columns = [
            {
                name: 'Device',
                selector: row => row.device,
            },
            {
                name: 'Result',
                selector: row => row.result,
                conditionalCellStyles: [
                    {
                        when: row => row.result == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
            {
                name: 'Number of Fails',
                selector: row => row.NoF,
                conditionalCellStyles: [
                    {
                        when: row => row.result == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
        ];
        let count = 0;
        data.push(
            {
                id: count++,
                device: 1,
                result: PorF,
                NoF: failCount,
            }
        );
        const inCol = [
            {
                name: 'Result Number',
                selector: row => row.resNum,
                conditionalCellStyles: [
                    {
                        when: row => row.porf == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
            {
                name: 'Upper Limit',
                selector: row => row.ul,
                conditionalCellStyles: [
                    {
                        when: row => row.porf == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
            {
                name: 'Lower Limit',
                selector: row => row.ll,
                conditionalCellStyles: [
                    {
                        when: row => row.porf == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
            {
                name: 'Data',
                selector: row => row.datapt,
                conditionalCellStyles: [
                    {
                        when: row => row.porf == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            },
            {
                name: 'PorF',
                selector: row => row.porf,
                conditionalCellStyles: [
                    {
                        when: row => row.porf == "Fail",
                        style: {
                            backgroundColor: 'rgba(242, 38, 19, 0.9)',
                            color: 'white',
                        }
                    }
                ],
            }
        ];
        console.log("data type: ",typeof(data));
        addData(data, inData);
        const ExpandedComponent = () => {
            return (
                <div>
                    <DataTable
                        columns={inCol}
                        data={inData}
                    />
                </div>
            );
        };
        return (
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
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
  
  export default connect(mapStateToProps, { addData })(Verifies);