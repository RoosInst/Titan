const formatInitialData = (tableData) => {
    const data = [];
    const { testNames, testUnits, testNumbers, partTestResults } = tableData;
    for(let j = 0; j < testNames[0].values.length; j++) {
        data.push({
            testName: testNames[0].values[j][0],
            units: testUnits[0].values[j][0],
            testNum: testNumbers[0].values[j][0],
            data1: partTestResults[0].values[j][0],
            data2: partTestResults[1].values[j][0],
            data3: partTestResults[2].values[j][0],
            data4: partTestResults[3].values[j][0],
            data5: partTestResults[4].values[j][0],
            data6: partTestResults[5].values[j][0],
            data7: partTestResults[6].values[j][0],
            data8: partTestResults[7].values[j][0],
            data9: partTestResults[8].values[j][0],
            data10: partTestResults[9].values[j][0]
        });
    }
    return data;
}

const formatNextPart = (partNumber, oldTableData, newTableData) => {
    console.log('NEXT PART NUMBER', partNumber);
    for(let j = 0; j < oldTableData.length; j++) {
        delete oldTableData[j][`data${partNumber-10}`];
        oldTableData[j][`data${partNumber}`] = newTableData[0].values[j][0];
    }
    return oldTableData;
}

const formatNextHeader = (oldHeaderData, newHeaderData) => {
    console.log('oldHeader', oldHeaderData)
    oldHeaderData.partNumbers[0].values.shift();
    oldHeaderData.partNumbers[0].values.push(newHeaderData.newPartNumber);
    console.log('newHeader', oldHeaderData);
    return oldHeaderData;
}

export { formatInitialData, formatNextPart, formatNextHeader };