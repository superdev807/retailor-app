import { takeLatest } from 'redux-saga/effects';
import apiCall from 'redux/api/call';
import { CREATE_APARTMENT } from './constant';

const createApartment = apiCall({
    type: CREATE_APARTMENT,
    method: 'post',
    path: () => 'api/apartments/create',
});

export default function* rootSaga() {
    yield takeLatest(CREATE_APARTMENT, createApartment);
}
