import { CREATE_APARTMENT, READ_APARTMENTS, UPDATE_APARTMENT, DELETE_APARTMENT } from './constant';

export function createApartment(payload) {
    return {
        type: CREATE_APARTMENT,
        payload,
    };
}

export function readApartments() {
    return {
        type: READ_APARTMENTS,
    };
}

export function updateApartment(payload) {
    return {
        type: UPDATE_APARTMENT,
        payload,
    };
}

export function deleteApartment(payload) {
    return {
        type: DELETE_APARTMENT,
        payload,
    };
}
