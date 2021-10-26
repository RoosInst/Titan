import React from 'react';
import { connect } from 'react-redux';
import { useTable, useGlobalFilter, useFilters, useFlexLayout, usePagination, useAsyncDebounce } from 'react-table';
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
  let data = props.tableData;
    //let data = props.tableData;//TableData(props.db);
    //let partID = props.parts_id;
    
    console.info('after', data);

    //console.info('in BuildTable: ', props.data2)

    const getData = () => {
      return "test";
    //   let newData = "",i;
    //   const { partNumbers, partOverallResult, partTestTime, partCycleTime, partSite } = props;
    //   let Device = ",,Device,";
    //   let Result= ",,Result,";
    //   let TestTime= ",,Test Time,";
    //   let CycleTime = ",,Cycle Time,";
    //   let Site = ",,Site,";
    //   let Titles = "Test Name,Units,Test Number,Data 1,Data 2,Data 3,Data 4,Data 5,Data 6,Data 7,Data 8,Data 9,Data 10";
    //   let dataHold = [];
    //   if(partNumbers[0] != undefined)
    //   {
    //     for(i=0;i<10;i++)
    //     {
    //       Device = Device.concat(partNumbers[0].values[i][0]);
    //       if(i != 9)
    //         Device = Device.concat(",")
    //       Result = Result.concat(partOverallResult[0].values[i][0]);
    //       if(i != 9)
    //         Result = Result.concat(",")
    //       TestTime = TestTime.concat(partTestTime[0].values[i][0]);
    //       if(i != 9)
    //         TestTime = TestTime.concat(",")
    //       CycleTime = CycleTime.concat(partCycleTime[0].values[i][0]);
    //       if(i != 9)
    //         CycleTime = CycleTime.concat(",")
    //       Site = Site.concat(partSite[0].values[i][0]);
    //       if(i != 9)
    //         Site = Site.concat(",")
    //       if(data[i] != undefined)
    //       {
    //         dataHold[i] = data[i].testName + "," + data[i].units + "," + data[i].testNum + "," + data[i].data1 + "," + data[i].data2 + "," + data[i].data3 + "," + data[i].data4 + "," + data[i].data5 + "," + data[i].data6 + "," + data[i].data7 + "," + data[i].data8 + "," + data[i].data9 + "," + data[i].data10;
    //       }
    //     }
    //     newData = Device + "\n" + Result + "\n" + TestTime + "\n" + CycleTime + "\n" + Site + "\n" + Titles;
    //     for(i=0;i<10;i++)
    //     {
    //       newData = newData + "\n" + dataHold[i];
    //     }
    //   }
    //   return newData;
    }

    const onClick = () => {
      //test = db.prepare
      //test.step()
      //test.get()
      //three steps to execute a query that makes it a little faster that I use in this function

      //previousPart onClick would use 
      //  - db (same)
      //  - previousPartNumber (declared in reducer_tableData)
      //  - previousPart (decalred in actions/tableData)
      //  - previousHeader (declared in action/headerData)
      const { db, nextPartNumber, nextPart, nextHeader } = props;

      //begins keeping track of how long queries took to complete
      let start = performance.now();

      //Gets the EntityId of the next part based on nextPartNumber
      //This entityId is what is used to retrieve test results, test time, etc for the given part
      let test = db.prepare(`SELECT value, entityID from ritdb1 WHERE name='PART_ID' GROUP BY value limit ${nextPartNumber}, 1`);
      test.step();
      let nextPartNumberResult = test.get()[1];

      //EnitityId that is used in the headerData section
      let nextPartNumberHeader = test.get();

      //gets the test results for the given part. This is the data that will actually appear in the table
      let nextPartTestResults = db.exec(`SELECT value FROM ritdb1 WHERE name='R' AND entityID='${nextPartNumberResult}' limit 10`);
      console.log(nextPartTestResults);

      //The section enclosed in stars is where the header data is retrieved
      //*********************** 
      test = db.prepare(`SELECT value from ritdb1 WHERE name='PF' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartResult = test.get();

      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_TEST_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartTestTime = test.get();

      test = db.prepare(`SELECT value from ritdb1 WHERE name='EVENT_CYCLE_TIME' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartCycleTime = test.get();

      test = db.prepare(`SELECT value from ritdb1 WHERE name='SITE_ID' AND entityID='${nextPartNumberResult}'`);
      test.step();
      let nextPartSiteId = test.get();
      //*********************** 

      //the test results are sent to the tableData reducer so that the data can be formatted
      nextPart(nextPartTestResults);

      //created an object out of the header data that you received
      let newHeaderData = {
        nextPartNumber,
        newPartNumber: nextPartNumberHeader,
        newPartOverallResult: nextPartResult[0],
        newPartTestTime: nextPartTestTime[0],
        newPartCycleTime: nextPartCycleTime[0],
        newPartSite: nextPartSiteId[0]
      };
      //send the object of header data to the headerData reducer so that the header can be formatted
      nextHeader(newHeaderData);

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
          Header: "hello",
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


    return (
      <div>
        <button>Previous Part</button>
        <button onClick={() => onClick()}>Next Part</button>
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
    partNumbers: state.headerData.partNumbers,
    partOverallResult: state.headerData.partOverallResult, 
    partTestTime: state.headerData.partTestTime,
    partCycleTime: state.headerData.partCycleTime,
    partSite: state.headerData.partSite
  }
}

export default connect(mapStateToProps, { nextPart, nextHeader })(BuildTable);
