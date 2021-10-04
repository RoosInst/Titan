import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Part from './Part';
import PartInfo from './PartInfo';
import { nextPart } from '../actions/tableData';
import { nextHeader } from '../actions/headerData';
import { CSVLink } from 'react-csv';

function BuildTable(props) {
    let data = props.tableData;//TableData(props.db);
    let partID = props.parts_id;
    
    console.info('after', data);

    //console.info('in BuildTable: ', props.data2)

    const onClick = () => {
      const { db, nextPartNumber, nextPart, nextHeader } = props;
      let start = performance.now();
      // Current Time: 360 - 370
      console.log(nextPartNumber);
      // let test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
      // test.step();
      // console.log(test.get());
      let test = db.prepare(`SELECT value from ritdb1 WHERE name='PF' AND entityID='2906'`);
      test.step();
      console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='2906'`);
      test.step();
      console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='2906'`);
      test.step();
      console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='2906'`);
      test.step();
      console.log(test.get());
      

      // let newPartNumber = db.exec(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
      // console.log(newPartNumber);
      // let newPartTestResult = db.exec(`SELECT value FROM ritdb1 WHERE entityID='${newPartNumber[0].values[0][1]}' AND name='R' limit 10;`);
      // console.log('newPartInfo', newPartTestResult)
    
      // let result = db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`);
      // let newHeaderData = {
      //   newPartNumber,
      //   newPartOverallResult: db.exec(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${newPartNumber[0].values[0][1]}'`),
      //   newPartTestTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
      //   newPartCycleTime: db.exec(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${newPartNumber[0].values[0][1]}'`),
      //   newPartSite: db.exec(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${newPartNumber[0].values[0][1]}'`),
      // }
      let end = performance.now();
      console.log('FIRST TOOK ', (end - start));
      // nextPart(newPartTestResult);
      // nextHeader(newHeaderData);
      
      
      // console.log(props);
      // const { testNames, testResults, partNumbers, currentPart, db, data } = props;
      // console.log(testResults);
      // let newEntry = db.exec(`SELECT value, indexId FROM ritdb1 WHERE EntityId='${partNumbers[0].values[currentPart][0]}' AND name='R';`);
      // console.log("newEntry", newEntry);
      // console.log(data);
      // let newData = [];
      // for(let j = 0; j < testNames[0].values.length; j++) {
      //   newData.push({
      //       testName: testNames[0].values[j][0],
      //       units: data[j].units,
      //       testNum: data[j].testNum,
      //       data0: data[j].data1,
      //       data1: data[j].data2,
      //       data2: data[j].data3,
      //       data3: data[j].data4,
      //       data4: data[j].data5,
      //       data5: data[j].data6,
      //       data6: data[j].data7,
      //       data7: data[j].data8,
      //       data8: newEntry[0].values[j][0],
      //   });
      // }
      // console.log(data);
      // props.updateData(newData);
      // props.nextPart();
    }

    const defaultColumn = React.useMemo(() => ({
        width: 1,
    }), [])
    
    const columns = React.useMemo(() => {
      let columnContents = [];
      columnContents.push(
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
        }
      );
      let  nextPartNumber = props.nextPartNumber;
      for(let x=0; x < 10; x++) {
        columnContents.push(
          {
            Header: () => (<Part partNum={x} />),
            accessor: `part${x}`,
            columns: [
              {
                Header: 'data',
                accessor: `data${nextPartNumber - (10 - x)}`,
              },
            ]
          }
        );
      }

      return columnContents
    }, [props.nextPartNumber]);
       
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
    const { globalFilter, pageIndex, pageSize } = state;

    return (
      <>
      <button onClick={() => onClick()}>Next Part</button>
      <CSVLink data={data}><button>Download CSV</button></CSVLink>
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
    tableData: state.tableData.formattedData,
    nextPartNumber: state.tableData.nextPartNumber
  }
}

export default connect(mapStateToProps, { nextPart, nextHeader })(BuildTable);
