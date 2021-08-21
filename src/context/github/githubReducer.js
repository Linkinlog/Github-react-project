import {
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    SEARCH_USERS,
    GET_USER,
    DEFAULT_USERS,
    SET_ALERT
} from '../types.js';
// eslint-disable-next-line 
export default (state, action) => {
    switch(action.type){
        case SET_ALERT:
            return{
                ...state,
                alert: action.payload,
            }
        case DEFAULT_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case GET_USER:
            return{
                ...state,
                user: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}