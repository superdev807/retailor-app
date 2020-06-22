import produce from 'immer';
import { API_SUCCESS, API_FAIL, API_PENDING, requestSuccess, requestFail, requestPending } from 'redux/api/request';
import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USERS } from './constants';

export const initialState = {
    curUser: {},
    users: [],
    realtors: [],
};

const usersReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case requestSuccess(GET_USERS):
                draft.users = action.payload;
                draft.realtors = action.payload.filter((user) => user.role === 'Realtor');
                break;
        }
    });

export default usersReducer;
