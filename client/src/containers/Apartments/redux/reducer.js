import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import { CREATE_APARTMENT, READ_APARTMENT, UPDATE_APARTMENT, DELETE_APARTMENT } from './constant';

export const initialState = {
    newGeoCode: '',
};

const apartmentReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            default:
                break;
        }
    });

export default apartmentReducer;
