import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from './githubReducer';
import {
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    SEARCH_USERS,
    GET_USER,
} from '../types.js';
import { data } from '../../components/layout/defaultUsers'



const GithubState = props => {

    const initialState = {
        users: data,
        user: {},
        repos : [],
        loading: false,
        alert: null,
    }  

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Default users
    const defaultUsers = async () => {
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        return res.data
    }
    
    // Search Users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }


    // Get User
    const getUser = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    
    }
    // Get Repos
    const getUserRepos = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }
    

    // Clear Users
    const clearUsers = async () => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        dispatch({
            type: CLEAR_USERS,
            payload: res.data
        })
    }
    

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return<githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert: state.alert,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
            defaultUsers,
        }}
    >
        {props.children}
    </githubContext.Provider>
}

export default GithubState;