import React from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';

function VerifiesTable(props) {
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
    const ExpandedComponent = ({data}) => {
        console.log("data in table", data);
        return (
            <div>
                <DataTable
                    columns={inCol}
                    data={data.inData}
                />
            </div>
        );
    };
    console.log("reducer verifies",props.verifyData);
    return (
        <div>
            <DataTable
                columns={columns}
                data={props.verifyData.data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
      verifyData: state.verifyTable,
    }
}

export default connect(mapStateToProps, { })(VerifiesTable);