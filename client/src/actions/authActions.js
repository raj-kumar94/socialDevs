import { TEST_DISPATCH } from './types';

const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
};

export default registerUser;

