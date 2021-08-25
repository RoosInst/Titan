import { UPDATE_DATA } from '../actions';

export default function(state = 
  [
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
  ]
, action) {
  switch(action.type) {
    case UPDATE_DATA:
      return action.data
    default:
      return (
        state
      )
  }
}