import {
    CREATE_APARTMENT,
    READ_APARTMENTS,
    UPDATE_APARTMENT,
    DELETE_APARTMENT,
    SET_PAGE_NUM,
    SET_ROWS_PER_PAGE,
    SET_APARTMENT_CREATING_STATE,
} from './constant';

export function createApartment(payload) {
    return {
        type: CREATE_APARTMENT,
        payload,
    };
}

export function readApartments(payload) {
    return {
        type: READ_APARTMENTS,
        payload,
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

export function setPageNum(payload) {
    return {
        type: SET_PAGE_NUM,
        payload,
    };
}

export function setRowsPerPage(payload) {
    return {
        type: SET_ROWS_PER_PAGE,
        payload,
    };
}

export function setApartmentCreatingState(payload) {
    return {
        type: SET_APARTMENT_CREATING_STATE,
        payload,
    };
}
