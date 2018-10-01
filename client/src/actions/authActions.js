import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRROS, SET_CURRENT_USER } from './types';

// const registerUser = (userData) => {
//     return {
//         type: TEST_DISPATCH,
//         payload: userData
//     }
// };


// dispatch is available because of thunk
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(result => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRROS,
            payload: err.response.data
        }));
};

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        const { token } = res.data;

        // save token in local storage
        localStorage.setItem('jwtToken', token);
        
        // set token to auth-header
        setAuthToken(token);

        // decode token to get user data
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRROS,
            payload: err.response.data
        });
    });
}


// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};


// logout user
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    // remove auth header for future requests
    setAuthToken(false);

    // set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
}