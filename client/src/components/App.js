import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Dive from './pages/Dive';
import Dives from './pages/Dives';
import AddDive from './pages/AddDive';
import DiveDetail from './pages/DiveDetail';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import FavouriteDives from './pages/FavouriteDives'
import api from '../api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dives: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <Switch>
          <Route exact path="/" exact component={Dive} />
          <Route path="/dives/:page" component={Dives} />
          <Route path="/favouriteDives" component={FavouriteDives} />
          <Route path="/add-dive" component={AddDive} />
          <Route path="/dive/:id" component={DiveDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
