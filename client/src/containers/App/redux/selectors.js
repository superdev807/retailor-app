import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { API_PENDING } from 'redux/api/request';

export const selectGlobal = (state) => state.global || initialState;

export const makeSelectIsAuthenticated = createSelector(selectGlobal, (globalState) => globalState.isAuthenticated);

export const makeSelectAuthNotification = createSelector(selectGlobal, (globalState) => globalState.authNotification);

export const makeSelectAuthError = createSelector(selectGlobal, (globalState) => globalState.authError);

export const makeSelectAuthUser = createSelector(selectGlobal, (globalState) => globalState.authUser);

export const makeSelectLogging = createSelector(selectGlobal, (globalState) => globalState.loginStatus === API_PENDING);
