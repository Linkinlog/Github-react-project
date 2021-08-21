import React, {useState, Fragment, useEffect} from 'react';
import { About } from './components/pages/About';
import Users from './components/users/Users'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './components/users/Search'
import { Alert } from './components/layout/Alert';
import User from './components/users/User';
import Navbar from './components/layout/Navbar';
import './App.css';
import GithubState from './context/github/GithubState';

const App = () => {
    return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar /> 
        <div className="container">
          <Alert/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search/>
                <Users />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props}/>
              )} />
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
}

export default App;
