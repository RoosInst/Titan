import { UPDATE_DB } from '../actions';

export default function(state = {}, action){
    switch(action.type) {
        case UPDATE_DB:
        return (
            action.db
        )
        default:
        return (
            state
        )
      }
};