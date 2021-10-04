export const UPDATE_DB = 'update_db';



export function updateData(data) { //generic send action to reducers (used for MQTT consts instead of writing 3 actions that do same thing (return self))
    return {
      type:'UPDATE_DATA',
      data: data
    }
  }

export function updateDb(data) { //generic send action to reducers (used for MQTT consts instead of writing 3 actions that do same thing (return self))
  return {
    type: UPDATE_DB,
    db: data
  }
}

export function addTest(numbers, results, names, partsID, result, testTime, cycleTime, site) { 
  return {
    type: 'ADD_TEST',
    part_numbers: numbers,
    test_results: results,
    test_names: names,
    parts_id: partsID,
    result: result,
    testTime: testTime,
    cycleTime: cycleTime,
    site: site,
  }
}