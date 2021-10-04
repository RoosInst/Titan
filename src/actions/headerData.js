export function initializeHeaderData(headerData) {
    return {
        type: 'INITIALIZE_HEADERS',
        headerData
    }
}

export function nextHeader(newHeaderData) {
    return {
        type: 'NEXT_HEADER',
        newHeaderData
    }
}