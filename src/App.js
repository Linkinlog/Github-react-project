import React from 'react';
import { About } from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert } from './components/layout/Alert';
import User from './components/users/User';
import Navbar from './components/layout/Navbar';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import { Main } from './components/layout/Main';
import { NotFound } from './components/pages/NotFound';
const App = () => {
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar /> 
              <div className="container">
                <Alert/>
                <Switch>
                  <Route exact path='/' component={Main} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/user/:login' component={User} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    );
}

export default App;
