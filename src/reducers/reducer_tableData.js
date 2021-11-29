import { formatInitialData, formatNextPart, formatPrevPart, formatTableScroll } from "../functions/dataFormat";

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
  prevPartNumber: 0,
  nextPartNumber: 0,
  nextPartScroll: 0,
  upcomingPartTestResults: []
  //NEED TO ADD A VARIABLE THAT KEEPS TRACK OF HOW MANY TESTS WE HAVE SCROLLED THROUGH
  //    -- THIS WILL BE USED IN THE FUNCTION THAT HANDLES SCROLLING
};


export default function(state = default_state, action) {
  switch(action.type) {
    case 'INITIALIZE_DATA':
      return {
        ...state,
        formattedData: formatInitialData(action.tableData, state.nextPartNumber)
      };

    case 'NEXT_PART':
      return {
        formattedData: formatNextPart(state.nextPartNumber, state.formattedData, action.newTableData),
        nextPartNumber: state.nextPartNumber + 1,
        prevPartNumber: state.prevPartNumber + 1
      }

    case 'TABLE_SCROLL':
      return {
        formattedData: formatTableScroll(state.formattedData, action.newTableData, action.nextPartNumber),
        nextPartNumber: action.nextPartNumber,
        prevPartNumber: action.prevPartNumber,
        nextPartScroll: action.nextPartScroll,
      }

    case 'PREV_PART':
        return {
          formattedData: formatPrevPart(state.prevPartNumber, state.formattedData, action.newTableData),
          nextPartNumber: state.nextPartNumber - 1,
          prevPartNumber: state.prevPartNumber - 1
        }
    case 'ADD_TEST':
      return {...state, test_names: action.test_names, test_results: action.test_results, part_numbers: action.part_numbers, parts_id: action.parts_id, result: action.result, testTime: action.testTime, cycleTime: action.cycleTime, site: action.site}

    default:
      return (
        state
      )
  }
}