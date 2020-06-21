import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import { CREATE_APARTMENT, READ_APARTMENT, UPDATE_APARTMENT, DELETE_APARTMENT, READ_APARTMENTS, SET_PAGE_NUM } from './constant';

export const initialState = {
    newGeoCode: '',
    apartmentCreating: 'initialized',
    apartmentsReading: 'initialized',
    apartments: [],
    totalLimit: 0,
    pageCount: 1,
    pageNum: 1,
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
            case requestPending(READ_APARTMENTS):
                draft.apartmentsReading = API_PENDING;
                break;
            case requestSuccess(READ_APARTMENTS):
                draft.apartments = [...draft.apartments, ...action.payload.docs];
                draft.totalLimit = action.payload.total;
                draft.pageCount = action.payload.pages;
                break;
            case requestFail(READ_APARTMENTS):
                draft.apartmentsReading = API_PENDING;
                break;
            case SET_PAGE_NUM:
                if (action.payload <= draft.totalLimit) {
                    draft.pageNum = action.payload;
                }
                break;
            default:
                break;
        }
    });

export default apartmentReducer;
