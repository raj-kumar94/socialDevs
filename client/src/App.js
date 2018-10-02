import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
              <Route exact path="/dashboard" component={ Dashboard } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
