import { all, takeLatest } from 'redux-saga/effects';

import { reportError } from '../../shared/utils/reportError';
import { PromiseAction, resolvePromiseAction, rejectPromiseAction } from '../../shared/utils/reduxSagaPromise';
import { api } from '../../shared/services/api';
import * as plantsActions from './plants.actions';
import { Plant } from './plants.types';

function* fetchPlants(action: PromiseAction<void, Plant[]>) {
  try {
    const { data } = yield api.get('/');
    yield resolvePromiseAction(action, data);
  } catch (error) {
    reportError(error);
    yield rejectPromiseAction(action, error);
  }
}

export function* watchPlants() {
  yield all([takeLatest(plantsActions.fetchPlants, fetchPlants)]);
}
