export default function(state = {}, action){
    switch(action.type) {
        case 'ADD_DB':
            return action.db;
            
        default:
            return state;
    }
};
