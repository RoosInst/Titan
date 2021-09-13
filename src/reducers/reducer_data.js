import { UPDATE_DATA } from '../actions';
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
parts: [],
};
export default function(state = default_state, action) {
  switch(action.type) {
    case UPDATE_DATA:
      return {...state, formatted_data: action.data}
    default:
      return (
        state
      )
  }
}