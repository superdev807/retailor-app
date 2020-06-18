import produce from 'immer';
import { API_PENDING, API_SUCCESS, API_FAIL, requestPending, requestSuccess, requestFail } from 'redux/api/request';
import { setCookie, deleteCookie } from 'utils/cookie';
import { SET_AUTHENTICATED, LOG_IN_WITH_EMAIL_PASSWORD } from './constants';

export const initialState = {
    isAuthenticated: false,
    is404: false,
    loginStatus: 'initialized',
};

const appReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_AUTHENTICATED:
                draft.isAuthenticated = action.isAuthenticated;
                break;
            case requestSuccess(LOG_IN_WITH_EMAIL_PASSWORD):
                console.log('>>>', action.payload.token);
                setCookie('appToken', action.payload.token);
                draft.isAuthenticated = true;
                break;
            case requestFail(LOG_IN_WITH_EMAIL_PASSWORD):
                deleteCookie('appToken', '/');
                draft.isAuthenticated = false;
                break;
        }
    });

export default appReducer;
