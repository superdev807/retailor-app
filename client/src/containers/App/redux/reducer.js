import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import { setCookie, deleteCookie } from 'utils/cookie';
import {
    SET_AUTHENTICATED,
    LOG_IN_WITH_EMAIL_PASSWORD,
    SET_AUTH_ERROR,
    SIGN_UP,
    SET_AUTH_NOTIFICATION,
    LOG_OUT,
    GET_USER_INFO,
} from './constants';

export const initialState = {
    isAuthenticated: false,
    is404: false,
    loginState: 'initialized',
    signUpState: 'initialized',
    authError: '',
    authNotification: '',
    authUser: {},
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
                setCookie('email', action.payload.user.email);
                draft.authUser = action.payload.user;
                draft.isAuthenticated = true;
                draft.loginState = API_SUCCESS;
                break;
            case requestFail(LOG_IN_WITH_EMAIL_PASSWORD):
                draft.authError = action.payload.message;
                deleteCookie('appToken', '/');
                deleteCookie('email', '/');
                draft.isAuthenticated = false;
                draft.loginState = API_FAIL;
                break;
            case requestPending(LOG_IN_WITH_EMAIL_PASSWORD):
                draft.loginState = API_PENDING;
                break;
            case requestSuccess(SIGN_UP):
                draft.authNotification = 'Successfully registered';
                draft.signUpState = API_SUCCESS;
                break;
            case requestFail(SIGN_UP):
                draft.authError = action.payload.message;
                draft.signUpState = API_FAIL;
                break;
            case requestPending(SIGN_UP):
                draft.signUpState = API_PENDING;
                break;
            case requestSuccess(GET_USER_INFO):
                draft.authUser = action.payload.user;
                break;
            case LOG_OUT:
                deleteCookie('appToken', '/');
                deleteCookie('email', '/');
                draft.isAuthenticated = false;
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
