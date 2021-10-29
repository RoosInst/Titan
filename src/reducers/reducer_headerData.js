import { formatNextHeader } from "../functions/dataFormat";

const defaultState = {
    partNumbers: [],
    partOverallResult: [],
    partTestTime: [],
    partCycleTime: [],
    partSite: []
}

export default function(state = defaultState, action) {
    switch(action.type) {
        case 'INITIALIZE_HEADERS':
            return action.headerData;

        case 'NEXT_HEADER':
            return formatNextHeader(state, action.newHeaderData);

        case 'HEADER_SCROLL':
            return action.newHeaderData

        default:
            return state;
    }
}