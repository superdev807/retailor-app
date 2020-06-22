import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USERS } from './constants';

export function createUser(payload) {
    return {
        type: CREATE_USER,
        payload,
    };
}

export function updateUser(payload) {
    return {
        type: UPDATE_USER,
        payload,
    };
}

export function deleteUser(payload) {
    return {
        type: DELETE_USER,
        payload,
    };
}

export function getUsers() {
    return {
        type: GET_USERS,
    };
}
