import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { requestPending } from 'redux/api/request';
import { LOG_IN_WITH_EMAIL_PASSWORD, SIGN_UP } from './constants';

const login = apiCall({
    type: LOG_IN_WITH_EMAIL_PASSWORD,
    method: 'post',
    path: () => 'api/users/login',
    payloadOnSuccess: (data) => {
        return { data: data.data };
    },
});

const signUp = apiCall({
    type: SIGN_UP,
    method: 'post',
    path: () => 'api/users/register',
    payloadOnSuccess: (data) => {
        return { data: data.data };
    },
});

export default function* rootSaga() {
    yield takeLatest(LOG_IN_WITH_EMAIL_PASSWORD, login);
    yield takeLatest(SIGN_UP, signUp);
}
