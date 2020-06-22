import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { GET_USERS } from './constants';

const getUsers = apiCall({
    type: GET_USERS,
    method: 'get',
    path: () => 'api/users/allUsers',
});

export default function* rootSaga() {
    yield takeLatest(GET_USERS, getUsers);
}
