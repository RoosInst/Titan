import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Part from './Part';
import PartInfo from './PartInfo';
import { updateData, nextPart } from '../actions';
import { CSVLink } from 'react-csv';

function BuildTable(props) {
    let data = props.data;//TableData(props.db);
    let partID = props.parts_id;
    let  currentPart = props.currentPart;
    console.log('currentPart', currentPart)
    console.info('after', data);

    //console.info('in BuildTable: ', props.data2)

    const onClick = () => {
      console.log(props);
      const { testNames, testResults, partNumbers, currentPart, db, data } = props;
      console.log(testResults);
      let newEntry = db.exec(`SELECT value, indexId FROM ritdb1 WHERE EntityId='${partNumbers[0].values[currentPart][0]}' AND name='R';`);
      console.log("newEntry", newEntry);
      console.log(data);
      let newData = [];
      for(let j = 0; j < testNames[0].values.length; j++) {
        newData.push({
            testName: testNames[0].values[j][0],
            units: data[j].units,
            testNum: data[j].testNum,
            data0: data[j].data1,
            data1: data[j].data2,
            data2: data[j].data3,
            data3: data[j].data4,
            data4: data[j].data5,
            data5: data[j].data6,
            data6: data[j].data7,
            data7: data[j].data8,
            data8: newEntry[0].values[j][0],
        });
      }
      console.log(data);
      props.updateData(newData);
      props.nextPart();
    }

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
            Header: () => (<Part partNum={currentPart-9} />),
            accessor: 'part0',
            columns: [
              {
                Header: 'data',
                accessor: 'data0',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-8} />),
            accessor: 'part1',
            columns: [
              {
                Header: 'data',
                accessor: 'data1',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-7} />),
            accessor: 'part2',
            columns: [
              {
                Header: 'data',
                accessor: 'data2',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-6} />),
            accessor: 'part3',
            columns: [
              {
                Header: 'data',
                accessor: 'data3',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-5} />),
            accessor: 'part4',
            columns: [
              {
                Header: 'data',
                accessor: 'data4',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-4} />),
            accessor: 'part5',
            columns: [
              {
                Header: 'data',
                accessor: 'data5',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-3} />),
            accessor: 'part6',
            columns: [
              {
                Header: 'data',
                accessor: 'data6',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-2} />),
            accessor: 'part7',
            columns: [
              {
                Header: 'data',
                accessor: 'data7',
              },
            ]
          },
          {
            Header: () => (<Part partNum={currentPart-1} />),
            accessor: 'part8',
            columns: [
              {
                Header: 'data',
                accessor: 'data8',
              },
            ]
          }
        ],
        [props.currentPart]
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
      <button onClick={() => onClick()}>Next Part</button>
      <CSVLink data={data}>Download CSV</CSVLink>
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
    data: state.data.formatted_data,
    testResults: state.data.test_results,
    testNames: state.data.test_names,
    partNumbers: state.data.part_numbers,
    currentPart: state.data.currentPart,
    parts_id: state.data.parts_id,
  }
}

export default connect(mapStateToProps, { updateData, nextPart })(BuildTable);
