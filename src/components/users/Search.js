import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext';


const Search = ({ popAlert }) => {
    const githubContext = useContext(GithubContext);
    const {searchUsers, clearUsers} = githubContext;
    const [ text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            popAlert('Please enter something', 'light')
        }else {
            searchUsers(text);
            setText('');
        }
    }
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users..." id="" value={text} onChange={onChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {githubContext.users.length > 0 && (
                    <button className="btn btn-light btn-block" onClick={clearUsers} >Clear</button>
                )}
            </div>
        )
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired,
};

export default Search
