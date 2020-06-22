import {
    LOG_IN_WITH_EMAIL_PASSWORD,
    LOG_OUT,
    SET_AUTH_USER,
    SET_AUTHENTICATED,
    SET_IS_404,
    SIGN_UP,
    SET_AUTH_ERROR,
    SET_AUTH_NOTIFICATION,
    GET_USER_INFO,
    GET_USERS,
} from './constants';
import { getCookie } from 'utils/cookie';

export function setAuthUser(authUser) {
    return {
        type: SET_AUTH_USER,
        authUser,
    };
}

export function setAuthenticated() {
    return {
        type: SET_AUTHENTICATED,
        isAuthenticated: getCookie('appToken') !== '',
    };
}

export function login(payload) {
    return {
        type: LOG_IN_WITH_EMAIL_PASSWORD,
        payload,
    };
}

export function logout() {
    return {
        type: LOG_OUT,
    };
}

export function set404(payload) {
    return {
        type: SET_IS_404,
        payload,
    };
}

export function signUp(payload) {
    return {
        type: SIGN_UP,
        payload,
    };
}

export function setAuthError(payload) {
    return {
        type: SET_AUTH_ERROR,
        payload,
    };
}

export function setAuthNotification(data) {
    return {
        type: SET_AUTH_NOTIFICATION,
        payload: data,
    };
}

export function getUserDetails(payload) {
    return {
        type: GET_USER_INFO,
        payload,
    };
}

export function getUsers() {
    return {
        type: GET_USERS,
    };
}
