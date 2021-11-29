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

  export function tableScroll(newTableData, nextPartNumber, prevPartNumber, nextPartScroll) {
    return {
      type: 'TABLE_SCROLL',
      newTableData,
      nextPartNumber,
      prevPartNumber,
      nextPartScroll,
    }
  }
  
  export function prevPart(newTableData) {
    return {
      type: 'PREV_PART',
      newTableData
    }
  }