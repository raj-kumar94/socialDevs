import { GET_ERRROS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

let authReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ERRROS:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;