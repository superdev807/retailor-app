import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { LOG_IN_WITH_EMAIL_PASSWORD, SIGN_UP, GET_USER_INFO, GET_USERS } from './constants';

const login = apiCall({
    type: LOG_IN_WITH_EMAIL_PASSWORD,
    method: 'post',
    path: () => 'api/users/login',
});

const signUp = apiCall({
    type: SIGN_UP,
    method: 'post',
    path: () => 'api/users/register',
});

const getUserInfo = apiCall({
    type: GET_USER_INFO,
    method: 'post',
    path: () => 'api/users/getUserInfo',
});

const getUsers = apiCall({
    type: GET_USERS,
    method: 'get',
    path: () => 'api/users/allUsers',
});

export default function* rootSaga() {
    yield takeLatest(LOG_IN_WITH_EMAIL_PASSWORD, login);
    yield takeLatest(SIGN_UP, signUp);
    yield takeLatest(GET_USER_INFO, getUserInfo);
    yield takeLatest(GET_USERS, getUsers);
}
