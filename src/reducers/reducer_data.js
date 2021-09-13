import { UPDATE_DATA, NEXT_PART } from '../actions';
let default_state = {
formatted_data: [
  {
    sequence: "--",
    entityId: "--",
    indexId: "--",
    name: "--",
    value: "--",
    value2: "--",
  },
  {
    sequence: "--",
    entityId: "--",
    indexId: "--",
    name: "--",
    value: "--",
    value2: "--",
  },
  {
    sequence: "--",
    entityId: "--",
    indexId: "--",
    name: "--",
    value: "--",
    value2: "--",
  },
],
test_names: [],
test_results: [],
part_numbers: [],
currentPart: 9,
};
export default function(state = default_state, action) {
  switch(action.type) {
    case UPDATE_DATA:
      return {...state, formatted_data: action.data}
    case NEXT_PART:
      return {...state, currentPart: state.currentPart + 1}
    case 'ADD_TEST':
      return {...state, test_names: action.test_names, test_results: action.test_results, part_numbers: action.part_numbers}
    default:
      return (
        state
      )
  }
}