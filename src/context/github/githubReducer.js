import {
    SEARCH_loading,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    SEARCH_USERS,
    GET_USER,
    DEFAULT_USERS
} from '../types.js';
// eslint-disable-next-line 
export default (state, action) => {
    switch(action.type){
        case DEFAULT_USERS:
            return {
                users: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                repos: action.payload,
                loading: false
            }
        case GET_USER:
            return{
                user: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
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