import React from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';

function BuildTable(props) {
    const data = props.data;
    console.info('after', data);
    //console.info('in BuildTable: ', props.data2)
    
    const columns = React.useMemo (
        () => [
            {
                Header: 'sequence',
                accessor: 'sequence',
            },
            {
                Header: 'entityId',
                accessor: 'entityId',
            },
            {
                Header: 'indexId',
                accessor: 'indexId',
            },
            {
                Header: 'name',
                accessor: 'name',
            },
            {
                Header: 'value',
                accessor: 'value',
            },
            {
                Header: 'value2',
                accessor: 'value2',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    return (
        <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 2px #2e353d',
                   background: '#2e353d',
                   color: '#e1ffff',
                   fontWeight: 'normal',
                   fontFamily: 'Helvetica, Arial, sans-serif',
                   padding: '8px',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '2px',
                       border: 'solid 1px black',
                       background: 'white',
                       fontFamily: 'Helvetica, Arial, sans-serif',
                       fontWeight: 'normal',
                     }}
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
    )
}

function mapStateToProps(state) {
  console.log('in func',state.data);
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, { })(BuildTable);
