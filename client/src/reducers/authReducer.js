
const initialState = {
    isAuthenticated: false,
    user: {}
};

let authReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default authReducer;