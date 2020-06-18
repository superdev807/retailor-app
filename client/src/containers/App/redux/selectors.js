import { createSelector } from 'reselect';
// import get from 'lodash/get';
// import isEmpty from 'lodash/isEmpty';

import { initialState } from './reducer';

export const selectGlobal = (state) => state.global || initialState;

export const makeSelectIsAuthenticated = createSelector(selectGlobal, (globalState) => globalState.isAuthenticated);
