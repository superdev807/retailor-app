import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { API_PENDING } from 'redux/api/request';

export const selectGlobal = (state) => state.Apartments || initialState;

export const makeSelectApartments = createSelector(selectGlobal, (globalState) => globalState.apartments);

export const makeSelectCreatingApartment = createSelector(selectGlobal, (globalState) => globalState.apartmentCreating === API_PENDING);
