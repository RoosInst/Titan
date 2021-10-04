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
        });
    }
    return data;
}

const formatNextPart = (partNumber, oldTableData, newTableData) => {
    //let newData = [];
    for(let j = 0; j < oldTableData.length; j++) {
        delete oldTableData[j][`data${partNumber-10}`];
        oldTableData[j][`data${partNumber}`] = newTableData[0].values[j][0];
        // newData.push({
        //     testName: oldTableData[j].testName,
        //     units: oldTableData[j].units,
        //     testNum: oldTableData[j].testNum,
        //     data0: oldTableData[j].data1,
        //     data1: oldTableData[j].data2,
        //     data2: oldTableData[j].data3,
        //     data3: oldTableData[j].data4,
        //     data4: oldTableData[j].data5,
        //     data5: oldTableData[j].data6,
        //     data6: oldTableData[j].data7,
        //     data7: oldTableData[j].data8,
        //     data8: newTableData[0].values[j][0],
        // });
    }
    return oldTableData;
}

const formatNextHeader = (oldHeaderData, newHeaderData) => {
    console.log('oldHeader', oldHeaderData)
    oldHeaderData.partNumbers[0].values.shift();
    oldHeaderData.partNumbers[0].values.push(newHeaderData.newPartNumber[0].values[0]);
    console.log('newHeader', oldHeaderData);
    return oldHeaderData;
}

export { formatInitialData, formatNextPart, formatNextHeader };