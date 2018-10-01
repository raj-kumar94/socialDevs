import axios from 'axios';
import { GET_ERRROS } from './types';

// const registerUser = (userData) => {
//     return {
//         type: TEST_DISPATCH,
//         payload: userData
//     }
// };


// dispatch is available because of thunk
const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(result => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRROS,
            payload: err.response.data
        }));
};

export default registerUser;

