import { call, put, select, takeLatest, delay, all } from 'redux-saga/effects';
import { request } from 'utils/request';
import { subscriptionActions as actions } from '.';
import { PlanErrorType } from './types';
import { SubValues, Plan } from 'types';
import { selectPreference } from './selectors';

const baseUrl = 'https://cloud-storage-prices-moberries.herokuapp.com';

function* fetchPlans() {
  yield delay(500);
  const requestURL = `${baseUrl}/prices`;

  try {
    const res = yield call(request, requestURL);
    const plans: Plan[] = res.subscription_plans;

    if (plans?.length > 0) {
      yield put(actions.plansLoaded(plans));
    } else {
      yield put(actions.planError(PlanErrorType.PLAN_NOT_FOUND));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.planError(PlanErrorType.PLAN_NOT_FOUND));
    } else {
      yield put(actions.planError(PlanErrorType.RESPONSE_ERROR));
    }
  }
}

function* subscribeToPlan() {
  const preference: SubValues = yield select(selectPreference);
  const requestURL = `https://httpbin.org/post`;

  try {
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(preference),
    });
    yield put(actions.subCreated());
  } catch (err) {
    yield put(actions.planError(PlanErrorType.RESPONSE_ERROR));
  }
}

export function* subscriptionSaga() {
  yield all([
    takeLatest(actions.loadPlans.type, fetchPlans),
    takeLatest(actions.createSub.type, subscribeToPlan),
  ]);
}
