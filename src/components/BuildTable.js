import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination, useAsyncDebounce } from 'react-table';
import GlobalFilter from './GlobalFilter';
import Part from './Part';
import PartInfo from './PartInfo';
import Scrollbar from './Scrollbar';
import { nextPart, prevPart } from '../actions/tableData';
import { nextHeader, prevHeader } from '../actions/headerData';
import { CSVLink } from 'react-csv';
import { compose } from 'redux';
import tableData from './tableData';

function BuildTable(props) {
  let data = props.tableData;
    //let data = props.tableData;//TableData(props.db);
    //let partID = props.parts_id;
    
    console.info('after', data);

    //console.info('in BuildTable: ', props.data2)

    const getData = () => {
      let newData = "",i;
      const { partNumbers, partOverallResult, partTestTime, partCycleTime, partSite, nextPartNumber } = props;
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
            dataHold[i] = data[i].testName + "," + data[i].units + "," + data[i].testNum + "," + data[i][`data${nextPartNumber + 9}`] + "," + data[i][`data${nextPartNumber + 8}`] + "," + data[i][`data${nextPartNumber + 7}`] + "," + data[i][`data${nextPartNumber + 6}`] + "," + data[i][`data${nextPartNumber + 5}`] + "," + data[i][`data${nextPartNumber + 4}`] + "," + data[i][`data${nextPartNumber + 3}`] + "," + data[i][`data${nextPartNumber + 2}`] + "," + data[i][`data${nextPartNumber + 1}`] + "," + data[i][`data${nextPartNumber }`];
          }
        }
        newData = Device + "\n" + Result + "\n" + TestTime + "\n" + CycleTime + "\n" + Site + "\n" + Titles;
        for(i=0;i<10;i++)
        {
          newData = newData + "\n" + dataHold[i];
        }
      }
      return newData;
    }

    const beginEnd = ( x ) => {
      if(x == 0)
      {
        console.log("begin");
      }
      if(x == 1)
      {
        console.log("end");
      }

    }

    const onClick = ( x ) => {
      //test = db.prepare
      //test.step()
      //test.get()
      //three steps to execute a query that makes it a little faster that I use in this function

      //previousPart onClick would use 
      //  - db (same)
      //  - previousPartNumber (declared in reducer_tableData)
      //  - previousPart (decalred in actions/tableData)
      //  - previousHeader (declared in action/headerData)
      const { db, nextPartNumber, prevPartNumber, nextPart, prevPart, nextHeader, prevHeader } = props;
      length = db.exec(`SELECT max(value) FROM ritdb1 WHERE name='PART_ID_OUT'`);
      length = length[0].values[0];
      console.log("length",length);
      if(prevPartNumber == 0 && x == 0)
      {
        return 0;
      } 
      else if(nextPartNumber + 10 >= length && x == 1)
      {
        return 0;
      }
      console.log("prev",prevPartNumber,nextPartNumber + 10);
      //begins keeping track of how long queries took to complete
      let start = performance.now();

      //Gets the EntityId of the next part based on nextPartNumber
      //This entityId is what is used to retrieve test results, test time, etc for the given part
      let test;
      if(x == 1)
      {
        test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber + 10}, 1`);
      }
      if(x == 0)
      {
        test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${prevPartNumber}, 1`);
      }
      test.step();
      let nextPartNumberResult = test.get()[1];
      console.log("Number Res:",nextPartNumberResult);

      //EnitityId that is used in the headerData section
      let nextPartNumberHeader = test.get();

      //gets the test results for the given part. This is the data that will actually appear in the table
      let nextPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}' limit 10`);
      console.log(nextPartTestResults);

      //The section enclosed in stars is where the header data is retrieved
      //*********************** 
      test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PF' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartResult = test.get();

      test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartTestTime = test.get();

      test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartCycleTime = test.get();

      test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='SITE_ID' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartSiteId = test.get();
      //*********************** 

      //the test results are sent to the tableData reducer so that the data can be formatted
      if(x == 1)
      {
        nextPart(nextPartTestResults);
      }
      if(x == 0)
      {
        prevPart(nextPartTestResults);
      }

      //created an object out of the header data that you received
      let newHeaderData = {
        nextPartNumber,
        newPartNumber: nextPartNumberHeader,
        newPartOverallResult: nextPartResult,
        newPartTestTime: nextPartTestTime,
        newPartCycleTime: nextPartCycleTime,
        newPartSite: nextPartSiteId
      };
      //send the object of header data to the headerData reducer so that the header can be formatted
      if(x == 1)
      {
        nextHeader(newHeaderData);
      }
      if(x == 0)
      {
        prevHeader(newHeaderData);
      }

      //shows how long the queries took to complete
      let end = performance.now();
      console.log('FIRST TOOK ', (end - start));
      
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
        let value = props.nextPartNumber + x;
        let newNumber = `data${value}`;
        console.log("NEW NUMBER", newNumber);
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
          Header: "",
          accessor: "scrollbar",
          columns: dataColumns
        };
      return [headerData, dataObject];
    }, [props.nextPartNumber]);

       
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data, defaultColumn }, useFlexLayout)

    const onScroll = (event) => {
      console.log(event.target.scrollLeft)
    }

    return (
      <div>
        <button onClick={() => beginEnd(0)}>Beginning</button>
        <button onClick={() => onClick(0)}>Previous Part</button>
        <button onClick={() => onClick(1)}>Next Part</button>
        <button onClick={() => beginEnd(1)}>End</button>
        <CSVLink data={getData()}><button>Download CSV</button></CSVLink>
        <Scrollbar />
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
     </div>
    )
}

function mapStateToProps(state) {
  return {
    db: state.db,
    tableData: state.tableData.formattedData,
    nextPartNumber: state.tableData.nextPartNumber,
    prevPartNumber: state.tableData.prevPartNumber,
    partNumbers: state.headerData.partNumbers,
    partOverallResult: state.headerData.partOverallResult, 
    partTestTime: state.headerData.partTestTime,
    partCycleTime: state.headerData.partCycleTime,
    partSite: state.headerData.partSite
  }
}

export default connect(mapStateToProps, { nextPart, prevPart, nextHeader, prevHeader })(BuildTable);
