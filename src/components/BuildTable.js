import React from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';

function BuildTable(props) {
    const data = mapStateToProps().data;
      // const data = React.useMemo(
      //   () => [
      //     {
      //       sequence: "test",
      //       entityId: "hello",
      //       indexId: "1234",
      //       name: "12",
      //       value: "12",
      //       value2: "123456",
      //     },
      //     {
      //       sequence: "100",
      //       entityId: "123456",
      //       indexId: "1000",
      //       name: "1002",
      //       value: "222",
      //       value2: "1234567",
      //     },
      //     {
      //       sequence: "1020123210",
      //       entityId: "12093823",
      //       indexId: "128972387",
      //       name: "1283723",
      //       value: "1283218",
      //       value2: "1287362",
      //     },
      //   ],
      //   []
      // )
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
                   fontFamily: 'Helvetica, Arial, sans-serif'
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
      data: [
        {
          sequence: "1020123210",
          entityId: "12093823",
          indexId: "128972387",
          name: "1283723",
          value: "1283218",
          value2: "1287362",
        },
        {
          sequence: "1020123210",
          entityId: "12093823",
          indexId: "128972387",
          name: "1283723",
          value: "1283218",
          value2: "1287362",
        },
      ]
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
