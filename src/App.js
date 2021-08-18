import React, {useState, Fragment, useEffect} from 'react';
import { About } from './components/pages/About';
import Users from './components/users/Users'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './components/users/Search'
import { Alert } from './components/layout/Alert';
import User from './components/users/User';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setUsers(res.data)
      setLoading(false);
    }
    getUsers();
    // eslint-disable-next-line
  }, [])

  // Search github users
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }
// Set error alert
  const popAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
    console.log('Ran')
  }
// Clear users being searched for
  const clearUsers = async () => {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data);
    setLoading(false);
  }
// Search for single user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);

  }

  // Get users repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);

  }

    return (
      typeof users !== 'undefined' && (
      <Router>
      <div className="App">
        <Navbar /> 
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={ users.length > 0 ? true : false } popAlert={popAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
              )} />
          </Switch>
        </div>
      </div>
      </Router>
      )
    );
}

export default App;
