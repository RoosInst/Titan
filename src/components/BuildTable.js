import React from 'react';
import { useTable } from 'react-table';

function BuildTable() {
    const data = React.useMemo (
        () => [
            {
                sequence: 'Test',
                entityId: 'Data',
                indexId: 'That',
                name: 'Will',
                value: 'Be',
                value2: 'Read',
            },
            {
                sequence: 'In',
                entityId: 'From',
                indexId: 'A',
                name: 'SQLite',
                value: 'Or',
                value2: 'DB',
            },
            {
                sequence: 'File',
                entityId: 'To',
                indexId: 'Find',
                name: 'A',
                value: 'Lot',
                value2: 'Of',
            },
            {
                sequence: 'Important',
                entityId: 'Information',
                indexId: '',
                name: '',
                value: '',
                value2: '',
            },
        ],
        []
    )

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

export default BuildTable;