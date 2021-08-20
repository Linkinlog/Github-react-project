import React from 'react'
import UserItems from './UserItems'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'
import { useContext } from 'react'


const Users = () =>  {
    const githubContext = useContext(GithubContext);
    const {loading, users } = githubContext;
    if (loading) {
        return <Spinner />
    } else {
        return (
            typeof users !== 'undefined' && (
                <div style={userStyle}>
                    {users.map(user => (
                        <UserItems key={user.id} user={user} />
                    ))}
                </div>
            )
        )
}}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}
export default Users
