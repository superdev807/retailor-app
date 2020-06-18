import produce from 'immer';
import { API_SUCCESS, API_FAIL, requestSuccess, requestFail } from 'redux/api/request';
import { setCookie, deleteCookie } from 'utils/cookie';
import { SET_AUTHENTICATED, LOG_IN_WITH_EMAIL_PASSWORD, SET_AUTH_ERROR, SIGN_UP, SET_AUTH_NOTIFICATION } from './constants';

export const initialState = {
    isAuthenticated: false,
    is404: false,
    loginStatus: 'initialized',
    authError: '',
    authNotification: '',
};

const appReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_AUTHENTICATED:
                draft.isAuthenticated = action.isAuthenticated;
                break;
            case requestSuccess(LOG_IN_WITH_EMAIL_PASSWORD):
                draft.authNotification = 'Welcome!';
                setCookie('appToken', action.payload.token);
                setCookie('userName', action.payload.user.firstName + ' ' + action.payload.user.lastName);
                setCookie('role', action.payload.user.role);
                draft.isAuthenticated = true;
                draft.loginStatus = API_SUCCESS;
                break;
            case requestFail(LOG_IN_WITH_EMAIL_PASSWORD):
                draft.authError = action.payload.message;
                deleteCookie('appToken', '/');
                deleteCookie('userName', '/');
                deleteCookie('role', '/');
                draft.isAuthenticated = false;
                draft.loginStatus = API_FAIL;
                break;
            case requestSuccess(SIGN_UP):
                draft.authNotification = 'Successfully registered';
                break;
            case requestFail(SIGN_UP):
                draft.authError = action.payload.message;
                break;
            case SET_AUTH_ERROR:
                draft.authError = action.payload;
                break;
            case SET_AUTH_NOTIFICATION:
                draft.authNotification = action.payload;
                break;
            default:
                break;
        }
    });

export default appReducer;
