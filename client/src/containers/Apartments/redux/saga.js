import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { CREATE_APARTMENT, READ_APARTMENTS, DELETE_APARTMENT, UPDATE_APARTMENT } from './constant';

const createApartment = apiCall({
    type: CREATE_APARTMENT,
    method: 'post',
    path: () => 'api/apartments/create',
});

const readApartments = apiCall({
    type: READ_APARTMENTS,
    method: 'post',
    path: () => 'api/apartments/read',
});

const deleteApartment = apiCall({
    type: DELETE_APARTMENT,
    method: 'delete',
    path: ({ payload }) => `api/apartments/delete/${payload.data.id}`,
});

const updateApartment = apiCall({
    type: UPDATE_APARTMENT,
    method: 'put',
    path: ({ payload }) => {
        return `api/apartments/update/${payload.data._id}`;
    },
});

export default function* rootSaga() {
    yield takeLatest(CREATE_APARTMENT, createApartment);
    yield takeLatest(READ_APARTMENTS, readApartments);
    yield takeLatest(DELETE_APARTMENT, deleteApartment);
    yield takeLatest(UPDATE_APARTMENT, updateApartment);
}
