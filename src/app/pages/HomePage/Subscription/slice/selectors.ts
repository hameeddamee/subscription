import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.subscription || initialState;

export const selectSubscription = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  subscription => subscription.loading,
);

export const selectSaving = createSelector(
  [selectSlice],
  subscription => subscription.saving,
);

export const selectError = createSelector(
  [selectSlice],
  subscription => subscription.error,
);

export const selectPlans = createSelector(
  [selectSlice],
  subscription => subscription.plans,
);

export const selectPreference = createSelector(
  [selectSlice],
  subscription => subscription.preference,
);
