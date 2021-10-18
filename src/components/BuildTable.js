import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Part from './Part';
import PartInfo from './PartInfo';
import Scrollbar from './Scrollbar';
import { nextPart } from '../actions/tableData';
import { nextHeader } from '../actions/headerData';
import { CSVLink } from 'react-csv';
import { compose } from 'redux';
import tableData from './tableData';

function BuildTable(props) {
    let data = props.tableData;//TableData(props.db);
    let partID = props.parts_id;
    
    console.info('after', data);

    //console.info('in BuildTable: ', props.data2)

    const getData = () => {
      let newData = "",i;
      const { partNumbers, partOverallResult, partTestTime, partCycleTime, partSite } = props;
      let Device = ",,Device,";
      let Result= ",,Result,";
      let TestTime= ",,Test Time,";
      let CycleTime = ",,Cycle Time,";
      let Site = ",,Site,";
      let Titles = "Test Name,Units,Test Number,Data 1,Data 2,Data 3,Data 4,Data 5,Data 6,Data 7,Data 8,Data 9,Data 10";
      let dataHold = [];
      if(partNumbers[0] != undefined)
      {
        for(i=0;i<10;i++)
        {
          Device = Device.concat(partNumbers[0].values[i][0]);
          if(i != 9)
            Device = Device.concat(",")
          Result = Result.concat(partOverallResult[0].values[i][0]);
          if(i != 9)
            Result = Result.concat(",")
          TestTime = TestTime.concat(partTestTime[0].values[i][0]);
          if(i != 9)
            TestTime = TestTime.concat(",")
          CycleTime = CycleTime.concat(partCycleTime[0].values[i][0]);
          if(i != 9)
            CycleTime = CycleTime.concat(",")
          Site = Site.concat(partSite[0].values[i][0]);
          if(i != 9)
            Site = Site.concat(",")
          if(data[i] != undefined)
          {
            dataHold[i] = data[i].testName + "," + data[i].units + "," + data[i].testNum + "," + data[i].data1 + "," + data[i].data2 + "," + data[i].data3 + "," + data[i].data4 + "," + data[i].data5 + "," + data[i].data6 + "," + data[i].data7 + "," + data[i].data8 + "," + data[i].data9 + "," + data[i].data10;
            console.log("dataHold: ",dataHold[i]);
          }
        }
        console.log("String: ",dataHold[0]);
        newData = Device + "\n" + Result + "\n" + TestTime + "\n" + CycleTime + "\n" + Site + "\n" + Titles;
        for(i=0;i<10;i++)
        {
          newData = newData + "\n" + dataHold[i];
        }
      }
      return newData;
    }

    const onClick = () => {
      const { db, nextPartNumber, nextPart, nextHeader } = props;
      let start = performance.now();
      // Current Time: 360 - 370
      console.log(nextPartNumber);
      //console.log("results", db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND EntityId='2912'`));
      let test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
      test.step();
      let nextPartNumberResult = test.get()[1];
      console.log(nextPartNumberResult)

      // test = db.prepare(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}'`);
      // test.step();
      let nextPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}' limit 10`);
      console.log(nextPartTestResults);

      //console.log(nextPart);
      test = db.prepare(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartResult = test.get();
      console.log(nextPartResult);
      //console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartTestTime = test.get();

      //console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartCycleTime = test.get();

      //console.log(test.get());
      test = db.prepare(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartSiteId = test.get();
      //console.log(test.get());
      nextPart(nextPartTestResults);

      let newHeaderData = {
        nextPartNumber,
        newPartNumber: nextPartNumberResult[0],
        newPartOverallResult: nextPartResult[0],
        newPartTestTime: nextPartTestTime[0],
        newPartCycleTime: nextPartCycleTime[0],
        newPartSite: nextPartSiteId[0]
      };
      nextHeader(newHeaderData);

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
      let headerData =
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
        };

      let dataColumns = [];
      for(let x=0; x < 10; x++) {
        let newNumber = `data${props.nextPartNumber - (10 - x)}`;
        dataColumns.push(
          {
            Header: () => (<Part partNum={x} />),
            accessor: `part${x}`,
            columns: [
              {
                Header: 'data',
                accessor: newNumber,
              },
            ]
          }
        );
      }

      let dataObject = 
        {
          Header: () => <Scrollbar />,
          accessor: "scrollbar",
          columns: dataColumns
        };
      return [headerData, dataObject];
    }, [props.nextPartNumber]);
       
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data, defaultColumn, globalFilter }, useFilters, useGlobalFilter, usePagination, useFlexLayout)
    const { globalFilter } = state;

    return (
      <>
      <button>Previous Part</button>
      <button onClick={() => onClick()}>Next Part</button>
      <CSVLink data={getData()}><button>Download CSV</button></CSVLink>
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
     </>
    )
}

function mapStateToProps(state) {
  console.log('in func',state.data);
  return {
    db: state.db,
    tableData: state.tableData.formattedData,
    nextPartNumber: state.tableData.nextPartNumber,
    partNumbers: state.headerData.partNumbers,
    partOverallResult: state.headerData.partOverallResult, 
    partTestTime: state.headerData.partTestTime,
    partCycleTime: state.headerData.partCycleTime,
    partSite: state.headerData.partSite
  }
}

export default connect(mapStateToProps, { nextPart, nextHeader })(BuildTable);
