import { all, put, select, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { reportError } from '../../shared/utils/reportError';
import * as plantsActions from './plants.actions';
import { selectPlants } from './plants.selectors';

function* fetchPlants() {
  try {
    const storagePlants = localStorage.getItem('plants');
    if (storagePlants) {
      const plants = JSON.parse(storagePlants || '');
      yield put(plantsActions.fetchPlantsSuccess(plants));
    }
  } catch (error) {
    reportError(error);
    yield put(plantsActions.fetchPlantsFailure(error));
  }
}

function* savePlants() {
  const plants = yield select(selectPlants);
  if (!isEmpty(plants)) {
    localStorage.setItem('plants', JSON.stringify(plants));
  }
}

export function* watchPlants() {
  yield all([
    takeLatest(plantsActions.fetchPlants, fetchPlants),
    takeLatest(plantsActions.addPlant, savePlants),
    takeLatest(plantsActions.editPlant, savePlants),
    takeLatest(plantsActions.deletePlant, savePlants),
  ]);
}
