import produce from 'immer';
import { API_PENDING, API_SUCCESS, API_FAIL, requestPending, requestSuccess, requestFail } from 'redux/api/request';
import { LOG_IN_COMPLETE, LOG_IN_FAIL } from './constants';

export const initialState = {
    isAuthenticated: false,
    is404: false,
    loginStatus: 'initialized',
};

const appReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_COMPLETE:
                draft.loginStatus = API_SUCCESS;
                draft.isAuthenticated = true;
                break;
            case LOG_IN_FAIL:
                draft.loginStatus = API_FAIL;
                draft.isAuthenticated = false;
                break;
        }
    });

export default appReducer;
