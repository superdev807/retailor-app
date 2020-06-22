import { createSelector } from 'reselect';
import { API_PENDING, API_SUCCESS } from 'redux/api/request';
import { initialState } from './reducer';

export const selectGlobal = (state) => state.userlist || initialState;

export const makeSelectUsers = createSelector(selectGlobal, (globalState) => globalState.users);

export const makeSelectRealtors = createSelector(selectGlobal, (globalState) => globalState.realtors);

export const makeSelectCreatePending = createSelector(selectGlobal, (globalState) => globalState.creatingState === API_PENDING);

export const makeSelectCreateSuccess = createSelector(selectGlobal, (globalState) => globalState.creatingState === API_SUCCESS);

export const makeSelectUpdatePending = createSelector(selectGlobal, (globalState) => globalState.updatingState === API_PENDING);

export const makeSelectUpdateSuccess = createSelector(selectGlobal, (globalState) => globalState.updatingState === API_SUCCESS);

export const makeSelectDeletePending = createSelector(selectGlobal, (globalState) => globalState.deletingState === API_PENDING);

export const makeSelectDeleteSuccess = createSelector(selectGlobal, (globalState) => globalState.deletingState === API_SUCCESS);
