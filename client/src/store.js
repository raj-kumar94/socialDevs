import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middlwware = [thunk];

// initial state for store
const initialState = {};

const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middlwware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;