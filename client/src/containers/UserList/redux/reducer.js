import produce from 'immer';
import { API_FAIL, API_PENDING, API_SUCCESS, requestSuccess, requestPending } from 'redux/api/request';
import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USERS } from './constants';
import { requestFail } from '../../../redux/api/request';

export const initialState = {
    curUser: {},
    users: [],
    realtors: [],
    creatingState: 'initialized',
    updatingState: 'initialized',
    deletingState: 'initialized',
};

const usersReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case requestSuccess(GET_USERS):
                draft.users = action.payload;
                draft.realtors = action.payload.filter((user) => user.role === 'Realtor');
                break;
            case requestPending(CREATE_USER):
                draft.creatingState = API_PENDING;
                break;
            case requestSuccess(CREATE_USER):
                draft.users.push(action.payload);
                draft.creatingState = API_SUCCESS;
                break;
            case requestFail(CREATE_USER):
                draft.creatingState = API_FAIL;
                break;
            case requestPending(UPDATE_USER):
                draft.updatingState = API_PENDING;
                break;
            case requestSuccess(UPDATE_USER):
                {
                    const { _id } = action.payload;
                    draft.users = draft.users.map((user) => {
                        if (user._id === _id) return action.payload;
                        return user;
                    });
                    draft.updatingState = API_SUCCESS;
                }
                break;
            case requestFail(UPDATE_USER):
                draft.updatingState = API_FAIL;
                break;
            case requestPending(DELETE_USER):
                draft.deletingState = API_PENDING;
                break;
            case requestSuccess(DELETE_USER):
                {
                    const { _id } = action.payload;
                    draft.users = draft.users.filter((user) => user._id !== _id);
                    draft.deletingState = API_SUCCESS;
                }
                break;
            case requestFail(DELETE_USER):
                draft.deletingState = API_FAIL;
                break;
            default:
                break;
        }
    });

export default usersReducer;
