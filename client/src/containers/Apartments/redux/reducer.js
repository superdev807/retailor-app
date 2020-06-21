import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import {
    CREATE_APARTMENT,
    UPDATE_APARTMENT,
    DELETE_APARTMENT,
    READ_APARTMENTS,
    SET_PAGE_NUM,
    SET_ROWS_PER_PAGE,
    SET_APARTMENT_CREATING_STATE,
} from './constant';

export const initialState = {
    newGeoCode: '',
    apartmentCreating: 'initialized',
    apartmentsReading: 'initialized',
    apartments: [],
    totalLimit: 0,
    pageCount: 1,
    pageNum: 1,
    rowsPerPage: 5,
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
                let pageSt = action.payload.limit * (action.payload.page - 1);
                let totalLimit = Math.min(pageSt + action.payload.limit, action.payload.total);
                for (let i = pageSt; i < totalLimit; ++i) draft.apartments[i] = action.payload.docs[i - pageSt];
                while (draft.apartments.length > action.payload.total) draft.apartments.pop();
                draft.totalLimit = action.payload.total;
                draft.pageCount = action.payload.pages;
                draft.apartmentsReading = API_SUCCESS;
                break;
            case requestFail(READ_APARTMENTS):
                draft.apartmentsReading = API_FAIL;
                break;
            case SET_PAGE_NUM:
                if (action.payload <= draft.totalLimit) {
                    draft.pageNum = action.payload;
                }
                break;
            case SET_ROWS_PER_PAGE:
                draft.rowsPerPage = action.payload;
                break;
            case SET_APARTMENT_CREATING_STATE:
                draft.apartmentCreating = action.payload;
                break;
            default:
                break;
        }
    });

export default apartmentReducer;
