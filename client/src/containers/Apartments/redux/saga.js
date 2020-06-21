import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { CREATE_APARTMENT, READ_APARTMENTS } from './constant';

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

export default function* rootSaga() {
    yield takeLatest(CREATE_APARTMENT, createApartment);
    yield takeLatest(READ_APARTMENTS, readApartments);
}
