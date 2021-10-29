export function initializeData(tableData) {
    return {
      type: 'INITIALIZE_DATA',
      tableData
    }
  }
  
  export function nextPart(newTableData) {
    return {
      type: 'NEXT_PART',
      newTableData
    }
  }

  export function tableScroll(newTableData, nextPartNumber) {
    return {
      type: 'TABLE_SCROLL',
      newTableData,
      nextPartNumber
    }
  }