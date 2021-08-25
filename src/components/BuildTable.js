import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Part from './Part';
import PartInfo from './PartInfo';
import ColumnFilter from './ColumnFilter';

function BuildTable(props) {
    let data = props.data;//TableData(props.db);
    console.info('after', data);
    //console.info('in BuildTable: ', props.data2)

    const defaultColumn = React.useMemo(
      () => ({
        width: 1,
      }),
      []
    )
    
    const columns = React.useMemo (
        () => [
          {
            Header: () => (<PartInfo />),
            accessor: 'PartInfo',
            columns: [
              {
                Header: 'testNum',
                accessor: 'testNum',
              },
              {
                Header: 'testName',
                accessor: 'testName',
              },
              {
                Header: 'units',
                accessor: 'units',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part0',
            columns: [
              {
                Header: 'data',
                accessor: 'data0',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part1',
            columns: [
              {
                Header: 'data',
                accessor: 'data1',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part2',
            columns: [
              {
                Header: 'data',
                accessor: 'data2',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part3',
            columns: [
              {
                Header: 'data',
                accessor: 'data3',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part4',
            columns: [
              {
                Header: 'data',
                accessor: 'data4',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part5',
            columns: [
              {
                Header: 'data',
                accessor: 'data5',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part6',
            columns: [
              {
                Header: 'data',
                accessor: 'data6',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part7',
            columns: [
              {
                Header: 'data',
                accessor: 'data7',
              },
            ]
          },
          {
            Header: () => (<Part />),
            accessor: 'part8',
            columns: [
              {
                Header: 'data',
                accessor: 'data8',
              },
            ]
          }
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
        setGlobalFilter,
    } = useTable({ columns, data, defaultColumn, globalFilter }, useFilters, useGlobalFilter, usePagination, useFlexLayout)
    const { globalFilter, pageIndex, pageSize } = state

    return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
     <div className='controls'> 
      <div className='controls1'>
        <span className='spaceright'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page: {' '}
          <input type='number' defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
            />
        </span>
      </div>
      <div className='controls1'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      <div className='controls1'>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }
        </select>
      </div>
     </div>
     </>
    )
}

function mapStateToProps(state) {
  console.log('in func',state.data);
  return {
    db: state.db,
    data: state.data
  }
}

export default connect(mapStateToProps, { })(BuildTable);
