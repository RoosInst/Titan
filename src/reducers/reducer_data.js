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
      console.log(action.data);
      return action.data[0].values.map((e) => {
        return {
          sequence: e[0],
          entityId: e[1],
          indexId: e[2],
          name: e[3],
          value: e[4],
          value2: e[5],
        }
      });
  }
  return state;
}