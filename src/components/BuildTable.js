import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination } from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';

function BuildTable(props) {
    let data = props.data;
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
                Header: 'sequence',
                accessor: 'sequence',
                Filter: ColumnFilter,
            },
            {
                Header: 'entityId',
                accessor: 'entityId',
                Filter: ColumnFilter,
            },
            {
                Header: 'indexId',
                accessor: 'indexId',
                Filter: ColumnFilter,
            },
            {
                Header: 'name',
                accessor: 'name',
                Filter: ColumnFilter,
            },
            {
                Header: 'value',
                accessor: 'value',
                Filter: ColumnFilter,
            },
            {
                Header: 'value2',
                accessor: 'value2',
                Filter: ColumnFilter,
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
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
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
    data: state.data
  }
}

export default connect(mapStateToProps, { })(BuildTable);
