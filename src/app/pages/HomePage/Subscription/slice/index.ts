import { PayloadAction } from '@reduxjs/toolkit';
import { Plan } from 'types/Plan';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { subscriptionSaga } from './saga';
import { SubscriptionState, PlanErrorType } from './types';
import { SubValues } from 'types/SubValues';

export const initialState: SubscriptionState = {
  loading: false,
  error: null,
  plans: [],
  preference: null,
  saving: false,
};

const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    loadPlans(state) {
      state.loading = true;
      state.error = null;
      state.plans = [];
    },
    plansLoaded(state, action: PayloadAction<Plan[]>) {
      const plans = action.payload;
      state.plans = plans;
      state.loading = false;
    },
    planError(state, action: PayloadAction<PlanErrorType>) {
      const error = action.payload;
      state.error = error;
      state.loading = false;
    },
    saveSubPreference(state, action: PayloadAction<SubValues>) {
      state.preference = action.payload;
    },
    createSub(state) {
      state.saving = true;
      state.error = null;
    },
    subCreated(state) {
      state.saving = false;
    },
  },
});

export const { actions: subscriptionActions, reducer } = slice;

export const useSubscriptionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: subscriptionSaga });
  return { actions: slice.actions };
};
