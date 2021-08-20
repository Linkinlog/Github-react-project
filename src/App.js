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
import GithubState from './context/github/GithubState';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);


// Set error alert
  const popAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
    console.log('Ran')
  }


    return (
      typeof users !== 'undefined' && (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar /> 
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search popAlert={popAlert} />
                <Users />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} user={user} repos={repos} />
              )} />
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
      )
    );
}

export default App;
