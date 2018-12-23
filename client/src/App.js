import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // a component for react-redux
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';

// creating a component to have private routes
import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

// check for token
if(localStorage.jwtToken) {
  // set auth token in header for authentication
  setAuthToken(localStorage.jwtToken);

  // decode token to get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // set current user and authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // logout the user
    store.dispatch(logoutUser());

    //clear current profile
    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={ Landing } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/profiles" component={ Profiles } />
              <Route exact path="/profile/:handle" component={ Profile } />
              {/* to prevent redirection issues, wrap PrivateRoute inside Switch */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={ AddExperience } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={ AddEducation } />
              </Switch>
              <Route exact path="/not-found" component={ NotFound } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
