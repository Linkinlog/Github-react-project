import {
    SET_ALERT, REMOVE_ALERT
} from '../types.js';
// eslint-disable-next-line 
export default (state, action) => {
    switch(action.type){
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alert : null
            }
        default:
            return state;
    }
}