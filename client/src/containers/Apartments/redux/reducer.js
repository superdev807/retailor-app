import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import { CREATE_APARTMENT, READ_APARTMENT, UPDATE_APARTMENT, DELETE_APARTMENT } from './constant';

export const initialState = {
    newGeoCode: '',
    apartmentCreating: 'initialized',
    apartments: [],
};

const apartmentReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case requestPending(CREATE_APARTMENT):
                draft.apartmentCreating = API_PENDING;
                break;
            case requestSuccess(CREATE_APARTMENT):
                draft.apartmentCreating = API_SUCCESS;
                break;
            case requestFail(CREATE_APARTMENT):
                draft.apartmentCreating = API_FAIL;
                break;
            default:
                break;
        }
    });

export default apartmentReducer;
