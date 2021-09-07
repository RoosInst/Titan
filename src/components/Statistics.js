import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useTable, useFlexLayout, usePagination } from 'react-table';

function Statistics(props) {
        if(props.db.db != undefined)
        {
            const db = props.db;
            let allData = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`);
            console.log(allData);
            let min = allData[0].values[0], max = allData[0].values[0], std;
            let passData = db.exec(`SELECT value FROM ritdb1 WHERE value='PASS' AND name='PF'`);
            let failData = db.exec(`SELECT value FROM ritdb1 WHERE value='FAIL' AND name='PF'`);
            passData = passData[0].values.length;
            failData = failData[0].values.length;
            let totalTest = passData + failData;
            let ppass = (passData/totalTest)*100;
            let pfail = (failData/totalTest)*100;
            var i,j,total = 0, mean = 0, diffSqredArr = [];
            for(i=0;i<allData[0].values.length;i+=1){
                total+=parseFloat(allData[0].values[i]);
                if(allData[0].values[i] > max)
                {
                    max = allData[0].values[i];
                }
                if(allData[0].values[i] < min)
                {
                    min = allData[0].values[i];
                }
            }
            mean = total/allData[0].values.length;
            for(j=0;j<allData[0].values.length;j+=1){
                diffSqredArr.push(Math.pow((allData[0].values[j]-mean),2));
            }
            std = Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
                return firstEl + nextEl;
            })/allData[0].values.length);
            const defaultColumn = React.useMemo(
                () => ({
                  width: 1,
                }),
                []
              )
            const data = React.useMemo (
                () => [
                    {
                        Passed: passData,
                        Failed: failData,
                        PPass: ppass.toFixed(1),
                        PFail: pfail.toFixed(1),
                        Min: min,
                        Max: max,
                        Mean: mean.toFixed(3),
                        STD: std.toFixed(3),
                    },
                ],
                []
            )        
            const columns = React.useMemo (
                () => [
                    {
                        Header: 'Passed',
                        accessor: 'Passed',
                    },
                    {
                        Header: 'Failed',
                        accessor: 'Failed',
                    },
                    {
                        Header: '% Passed',
                        accessor: 'PPass',
                    },
                    {
                        Header: '% Failed',
                        accessor: 'PFail',
                    },
                    {
                        Header: 'Min',
                        accessor: 'Min',
                    },
                    {
                        Header: 'Max',
                        accessor: 'Max',
                    },
                    {
                        Header: 'Mean',
                        accessor: 'Mean',
                    },
                    {
                        Header: 'STD Deviation',
                        accessor: 'STD',
                    },
                ],
                []
            )
        
            const {
                getTableProps,
                getTableBodyProps,
                headerGroups,
                page,
                nextPage,
                previousPage,
                canNextPage,
                canPreviousPage,
                pageOptions,
                gotoPage,
                pageCount,
                setPageSize,
                prepareRow,
                state,
            } = useTable({ columns, data, defaultColumn }, usePagination, useFlexLayout)
            const { pageIndex, pageSize } = state
        
            return (
              <>
              <table {...getTableProps()} className='whole-table' >
              <thead >
                 {headerGroups.map(headerGroup => (
                   <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                       <th
                         {...column.getHeaderProps()}
                         className='table-header'
                       >
                         {column.render('Header')}
                       </th>
                     ))}
                   </tr>
                 ))}
               </thead>
               <tbody {...getTableBodyProps()}>
                 {page.map(row => {
                   prepareRow(row)
                   return (
                     <tr {...row.getRowProps()}>
                       {row.cells.map(cell => {
                         return (
                           <td
                             {...cell.getCellProps()}
                             className='table-body'
                           >
                             {cell.render('Cell')}
                           </td>
                         )
                       })}
                     </tr>
                   )
                 })}
               </tbody>
             </table>
             </>
             )
                
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
  
  export default connect(mapStateToProps, {})(Statistics);