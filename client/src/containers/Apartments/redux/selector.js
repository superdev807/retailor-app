import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { API_SUCCESS, API_PENDING } from 'redux/api/request';

export const selectGlobal = (state) => state.Apartments || initialState;

export const makeSelectApartments = createSelector(selectGlobal, (globalState) => globalState.apartments);

export const makeSelectPageNum = createSelector(selectGlobal, (globalState) => globalState.pageNum);

export const makeSelectPageCount = createSelector(selectGlobal, (globalState) => globalState.pageCount);

export const makeSelectRowsPerPage = createSelector(selectGlobal, (globalState) => globalState.rowsPerPage);

export const makeSelectApartmentCreateSuccess = createSelector(
    selectGlobal,
    (globalState) => globalState.apartmentCreating === API_SUCCESS
);

export const makeSelectCreatingApartment = createSelector(selectGlobal, (globalState) => globalState.apartmentCreating === API_PENDING);

export const makeSelectApartmentCreatingState = createSelector(selectGlobal, (globalState) => globalState.apartmentCreating);

export const makeSelectReadingApartment = createSelector(selectGlobal, (globalState) => globalState.apartmentsReading === API_PENDING);

export const makeSelectApartmentReadingState = createSelector(selectGlobal, (globalState) => globalState.apartmentsReading);

export const makeSelectApartmentDeleteSuccess = createSelector(
    selectGlobal,
    (globalState) => globalState.apartmentDeleteing === API_SUCCESS
);

export const makeSelectDeletingApartment = createSelector(selectGlobal, (globalState) => globalState.apartmentDeleteing === API_PENDING);

export const makeSelectApartmentDeletingState = createSelector(selectGlobal, (globalState) => globalState.apartmentDeleteing);

export const makeSelectTotalLimit = createSelector(selectGlobal, (globalState) => globalState.totalLimit);

export const makeSelectSuccessMsg = createSelector(selectGlobal, (globalState) => globalState.successMsg);

export const makeSelectFailedMsg = createSelector(selectGlobal, (globalState) => globalState.failedMsg);
