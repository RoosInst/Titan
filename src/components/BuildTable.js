import React from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';

function BuildTable(props) {
    const data = mapStateToProps().data;
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
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px black',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
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
                       padding: '10px',
                       border: 'solid 1px black',
                       background: 'white',
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
  if(state === undefined)
  {
    return {
      data: []
    }
  }
  else {
    console.log('in func',state.data);
    return {
      data: state.data
    }
  }
}

export default connect(mapStateToProps, { })(BuildTable);
