import { all, put, takeLatest } from 'redux-saga/effects';

import { reportError } from '../../shared/utils/reportError';
import { plants as plantsFixture } from '../../mocks/fixtures/plants.json';
import * as plantsActions from './plants.actions';

function* fetchPlants() {
  try {
    yield put(plantsActions.fetchPlantsSuccess(plantsFixture));
  } catch (error) {
    reportError(error);
    yield put(plantsActions.fetchPlantsFailure(error));
  }
}

export function* watchPlants() {
  yield all([takeLatest(plantsActions.fetchPlants, fetchPlants)]);
}
