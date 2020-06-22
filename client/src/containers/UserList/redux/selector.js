import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectGlobal = (state) => state.userlist || initialState;

export const makeSelectUsers = createSelector(selectGlobal, (globalState) => globalState.users);

export const makeSelectRealtors = createSelector(selectGlobal, (globalState) => globalState.realtors);
