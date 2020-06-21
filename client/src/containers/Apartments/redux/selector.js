import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { API_PENDING } from 'redux/api/request';

export const selectGlobal = (state) => state.Apartments || initialState;

export const makeSelectApartments = createSelector(selectGlobal, (globalState) => globalState.apartments);

export const makeSelectCreatingApartment = createSelector(selectGlobal, (globalState) => globalState.apartmentCreating === API_PENDING);

export const makeSelectPageNum = createSelector(selectGlobal, (globalState) => globalState.pageNum);

export const makeSelectPageCount = createSelector(selectGlobal, (globalState) => globalState.pageCount);

export const makeSelectRowsPerPage = createSelector(selectGlobal, (globalState) => globalState.rowsPerPage);

export const makeSelectApartmentCreatingState = createSelector(selectGlobal, (globalState) => globalState.apartmentCreating);

export const makeSelectTotalLimit = createSelector(selectGlobal, (globalState) => globalState.totalLimit);
