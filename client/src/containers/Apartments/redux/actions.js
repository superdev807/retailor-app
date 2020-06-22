import {
    CREATE_APARTMENT,
    READ_APARTMENTS,
    UPDATE_APARTMENT,
    DELETE_APARTMENT,
    SET_PAGE_NUM,
    SET_ROWS_PER_PAGE,
    SET_APARTMENT_CREATING_STATE,
    SET_APARTMENT_DELETING_STATE,
    SET_SUCCESS_MSG,
    SET_FAILED_MSG,
    SET_FILTER_VALUES,
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

export function setApartmentDeletingState(payload) {
    return {
        type: SET_APARTMENT_DELETING_STATE,
        payload,
    };
}

export function setSuccessMsg(payload) {
    return {
        type: SET_SUCCESS_MSG,
        payload,
    };
}

export function setFailedMsg(payload) {
    return {
        type: SET_FAILED_MSG,
        payload,
    };
}

export function setFilterValues(payload) {
    return {
        type: SET_FILTER_VALUES,
        payload,
    };
}
