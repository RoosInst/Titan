import { UPDATE_DATA } from '../actions';

export default function(state = {}, action) {
  let newState = {};
  switch(action.type) {
    case UPDATE_DATA:
      Object.assign(newState, state);
      newState = action.data;
      //console.info(newState)
      return newState;
  }
  return state;
}