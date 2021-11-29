import tableData from "../components/tableData";

const formatInitialData = (tableData) => {
    const data = [];
    const { testNames, testUnits, testNumbers, partTestResults } = tableData;
    for(let j = 0; j < testNames[0].values.length; j++) {
        data.push({
            testName: testNames[0].values[j][0],
            units: testUnits[0].values[j][0],
            testNum: testNumbers[0].values[j][0],
            data0: partTestResults[0].values[j][0],
            data1: partTestResults[1].values[j][0],
            data2: partTestResults[2].values[j][0],
            data3: partTestResults[3].values[j][0],
            data4: partTestResults[4].values[j][0],
            data5: partTestResults[5].values[j][0],
            data6: partTestResults[6].values[j][0],
            data7: partTestResults[7].values[j][0],
            data8: partTestResults[8].values[j][0],
            data9: partTestResults[9].values[j][0],
        });
    }
    return data;
}

const formatNextPart = (partNumber, oldTableData, newTableData) => {
    console.log('NEXT PART NUMBER', partNumber);
    //loops 10 times for the ten tests(rows) that are displayed in the table
    for(let j = 0; j < oldTableData.length; j++) {
        //deletes the first data element from the tableData object
        //uses partNumber-10 to locate the first key
        //EX:
        //  data1: 3, data2: 3, data3: 3, .... data10: 3  --->  data2: 3, data3: 3, .... data10: 3
        //removes data1 from the object
        delete oldTableData[j][`data${partNumber}`];

        //adds a new key and value to the tableData object based on nextPartNumber
        //EX: 
        //  data2: 3, data3: 3, .... data10: 3  --->  data2: 3, data3: 3, .... data10: 3, data11: 3
        oldTableData[j][`data${partNumber+10}`] = newTableData[0].values[j][0];

        //formatPreviousPart would flip these operations
        //  it would delete the largest data key from the object and add a new one at the beginning of it
        //EX:
        //  data3: 3, .... data13: 3  ---->  data2: 3, .... data12: 3
    }
    return oldTableData;
}

const formatTableScroll = (oldTableData, newTableData, nextPartNumber) => {
    const data = [];
    const { partTestResults } = newTableData;
    console.log('partTestResults', partTestResults)
    console.log(oldTableData.length);
    for(let j = 0; j < oldTableData.length; j++) {
        data.push({
            testName: oldTableData[j].testName,
            units: oldTableData[j].units,
            testNum: oldTableData[j].testNum,
            [`data${nextPartNumber}`]: partTestResults[0].values[j][0],
            [`data${nextPartNumber + 1}`]: partTestResults[1].values[j][0],
            [`data${nextPartNumber + 2}`]: partTestResults[2].values[j][0],
            [`data${nextPartNumber + 3}`]: partTestResults[3].values[j][0],
            [`data${nextPartNumber + 4}`]: partTestResults[4].values[j][0],
            [`data${nextPartNumber + 5}`]: partTestResults[5].values[j][0],
            [`data${nextPartNumber + 6}`]: partTestResults[6].values[j][0],
            [`data${nextPartNumber + 7}`]: partTestResults[7].values[j][0],
            [`data${nextPartNumber + 8}`]: partTestResults[8].values[j][0],
            [`data${nextPartNumber + 9}`]: partTestResults[9].values[j][0]
        });
    }
    return data;
}

const formatPrevPart = (partNumber, oldTableData, newTableData) => {
    console.log('PREV PART NUMBER', partNumber);
    for(let j = 0; j < oldTableData.length; j++) {
        //deletes the first data element from the tableData object
        //uses partNumber-10 to locate the first key
        //EX:
        //  data1: 3, data2: 3, data3: 3, .... data10: 3  --->  data2: 3, data3: 3, .... data10: 3
        //removes data1 from the object
        delete oldTableData[j][`data${partNumber+10}`];

        //adds a new key and value to the tableData object based on nextPartNumber
        //EX: 
        //  data2: 3, data3: 3, .... data10: 3  --->  data2: 3, data3: 3, .... data10: 3, data11: 3
        oldTableData[j][`data${partNumber}`] = newTableData[0].values[j][0];

        //formatPreviousPart would flip these operations
        //  it would delete the largest data key from the object and add a new one at the beginning of it
        //EX:
        //  data3: 3, .... data13: 3  ---->  data2: 3, .... data12: 3
    }
    return oldTableData;
}

//this function is techincally incomplete because it only changes the part number portion of the header but that's ok for now
const formatNextHeader = (oldHeaderData, newHeaderData) => {
    console.info('OLD HEADER DATA', oldHeaderData);

    //shifts the header data to the left so that the first item is lost
    //basically identical to formatNextPart logic but using arrays instead of objects
    oldHeaderData.partNumbers[0].values.shift();
    oldHeaderData.partCycleTime[0].values.shift();
    oldHeaderData.partOverallResult[0].values.shift();
    oldHeaderData.partSite[0].values.shift();
    oldHeaderData.partTestTime[0].values.shift();

    //pushes the new part number into the array of part numbers
    //again, same logic as formatNextPart but using arrays instead of objects
    oldHeaderData.partNumbers[0].values.push(newHeaderData.newPartNumber);
    oldHeaderData.partCycleTime[0].values.push(newHeaderData.newPartCycleTime);
    oldHeaderData.partOverallResult[0].values.push(newHeaderData.newPartOverallResult);
    oldHeaderData.partSite[0].values.push(newHeaderData.newPartSite);
    oldHeaderData.partTestTime[0].values.push(newHeaderData.newPartTestTime);
    
    //formatPreviousHeader 
    // reverse this logic so that the new data comes at the beginning of the array instead of at the end of it



    return oldHeaderData;
}

const formatPrevHeader = (oldHeaderData, newHeaderData) => {

    oldHeaderData.partNumbers[0].values.unshift(newHeaderData.newPartNumber);
    oldHeaderData.partCycleTime[0].values.unshift(newHeaderData.newPartCycleTime);
    oldHeaderData.partOverallResult[0].values.unshift(newHeaderData.newPartOverallResult);
    oldHeaderData.partSite[0].values.unshift(newHeaderData.newPartSite);
    oldHeaderData.partTestTime[0].values.unshift(newHeaderData.newPartTestTime);

    oldHeaderData.partNumbers[0].values.pop();
    oldHeaderData.partCycleTime[0].values.pop();
    oldHeaderData.partOverallResult[0].values.pop();
    oldHeaderData.partSite[0].values.pop();
    oldHeaderData.partTestTime[0].values.pop();

    console.log("1",oldHeaderData);
    console.log("2",newHeaderData);

    return oldHeaderData;
}

export { formatInitialData, formatNextPart, formatPrevPart, formatNextHeader, formatPrevHeader, formatTableScroll };
