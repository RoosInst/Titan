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