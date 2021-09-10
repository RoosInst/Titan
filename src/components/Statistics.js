import React from 'react';
import { connect } from 'react-redux';
import { useTable, useFlexLayout, usePagination } from 'react-table';

function Statistics(props) {
        if(props.db.db != undefined)
        {
            const db = props.db;
            let passData = parseInt(db.exec(`SELECT COUNT(*) FROM ritdb1 WHERE value='PASS' AND name='PF'`)[0].values);
            let failData = parseInt(db.exec(`SELECT COUNT(*) FROM ritdb1 WHERE value='FAIL' AND name='PF'`)[0].values);
            let min = db.exec(`SELECT MIN(value) FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`)[0].values;
            let max = db.exec(`SELECT MAX(value) FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`)[0].values;
            let mean = db.exec(`SELECT AVG(value) FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`)[0].values;
            let std = db.exec(`SELECT STDEV(value) FROM ritdb1 WHERE name='R' AND value2='PV' OR value2='FV'`)[0].values;
            let totalTest = passData + failData;
            let ppass = (passData/totalTest)*100;
            let pfail = (failData/totalTest)*100;
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
                        Mean: mean,
                        STD: std,
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