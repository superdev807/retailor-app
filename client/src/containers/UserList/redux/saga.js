import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { CREATE_USER, GET_USERS, UPDATE_USER, DELETE_USER } from './constants';

const getUsers = apiCall({
    type: GET_USERS,
    method: 'get',
    path: () => 'api/users/allUsers',
});

const createUser = apiCall({
    type: CREATE_USER,
    method: 'post',
    path: () => 'api/users/create',
});

const updateUser = apiCall({
    type: UPDATE_USER,
    method: 'put',
    path: ({ payload }) => {
        return `api/users/update/${payload.data._id}`;
    },
});

const deleteUser = apiCall({
    type: DELETE_USER,
    method: 'delete',
    path: ({ payload }) => `api/users/delete/${payload.data._id}`,
});

export default function* rootSaga() {
    yield takeLatest(GET_USERS, getUsers);
    yield takeLatest(CREATE_USER, createUser);
    yield takeLatest(UPDATE_USER, updateUser);
    yield takeLatest(DELETE_USER, deleteUser);
}
