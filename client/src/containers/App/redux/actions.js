import { LOG_IN_WITH_EMAIL_PASSWORD, LOG_OUT_COMPLETE, LOG_OUT, SET_AUTH_USER, SET_AUTHENTICATED, SET_IS_404, SIGN_UP } from './constants';
import { getCookie } from 'utils/cookie';

/**
 * Determines if the screen is for desktop or phone
 *
 * @param  {boolean} isDesktop isDesktop boolean value
 * @param  {boolean} isPhone isPhone boolean value
 *
 * @return {object} An action object with a type of SET_SCREEN, isDesktop, and isPhone
 */

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

export function login(data) {
    return {
        type: LOG_IN_WITH_EMAIL_PASSWORD,
        payload: { ...data },
    };
}

export function logout() {
    return {
        type: LOG_OUT,
    };
}

export function logoutComplete() {
    return {
        type: LOG_OUT_COMPLETE,
    };
}

export function set404(payload) {
    return {
        type: SET_IS_404,
        payload,
    };
}

export function signUp(data) {
    return {
        type: SIGN_UP,
        payload: { ...data },
    };
}