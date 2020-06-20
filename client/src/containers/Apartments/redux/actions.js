import { CREATE_APARTMENT, READ_APARTMENTS, UPDATE_APARTMENT, DELETE_APARTMENT } from './constant';

export function createApartment(apartment) {
    return {
        type: CREATE_APARTMENT,
        apartment,
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

export function deleteApartment(apartment_id) {
    return {
        type: DELETE_APARTMENT,
        apartment_id,
    };
}
