export const UPDATE_DATA ='update_data';

export function updateData(data) { //generic send action to reducers (used for MQTT consts instead of writing 3 actions that do same thing (return self))
    return {
      type: UPDATE_DATA,
      data: data
    }
  }