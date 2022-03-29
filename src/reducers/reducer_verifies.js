const default_state = { columns: [
    {
        name: 'Result Name',
        selector: row => row.resName,
    },
    {
        name: 'Upper Limit',
        selector: row => row.upperLim,
    },
    {
        name: 'Lower Limit',
        selector: row => row.lowerLim,
    },
    {
        name: 'file 1',
        selector: row => row.file1,
    }
] };

export default function(state = { data: [], dd_data: [] }, action){
    switch(action.type) {
        case 'ADD_DATA':
            return { data: [ ...state.data, action.data ], dd_data: [ ...state.dd_data, action.dd_data ] };
        default:
            return state;
    }
};