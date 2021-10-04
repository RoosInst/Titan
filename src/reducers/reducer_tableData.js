import { formatInitialData, formatNextPart } from "../functions/dataFormat";

let default_state = {
  formattedData: [
    {
      testName: "--",
      units: "--",
      testNum: "--",
      data0: "--",
      data1: "--",
      data2: "--",
      data3: "--",
      data4: "--",
      data5: "--",
      data6: "--",
      data7: "--",
      data8: "--",
    },
  ],
  nextPartNumber: 10,
  upcomingPartTestResults: []
};


export default function(state = default_state, action) {
  switch(action.type) {
    case 'INITIALIZE_DATA':
      return {
        ...state,
        formattedData: formatInitialData(action.tableData)
      };
    
    case 'NEXT_PART':
      return {
        formattedData: formatNextPart(state.nextPartNumber, state.formattedData, action.newTableData),
        nextPartNumber: state.nextPartNumber + 1
      }

    case 'NEXT_PART':
      return {...state, currentPart: state.currentPart + 1}
    case 'ADD_TEST':
      return {...state, test_names: action.test_names, test_results: action.test_results, part_numbers: action.part_numbers, parts_id: action.parts_id, result: action.result, testTime: action.testTime, cycleTime: action.cycleTime, site: action.site}
    default:
      return (
        state
      )
  }
}