/**
 * @author Jordan Satterfield
 * @description Contains the alert reducer for dispatching alerts.
 */

// All Redux actions for alerts.
import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = [];

function alertReducer(state = initialState, action){

    const {type, payload} = action;

    switch(type){
        //Sets the dispatched alert
        case SET_ALERT:
            return [...state, payload];
        //Removes the dispatched alert
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

export default alertReducer;