import { all, fork } from 'redux-saga/effects';

import { watchStartup } from '../modules/startup/startup.sagas';
import { watchUsers } from '../modules/users/users.sagas';
import { watchPlants } from '../modules/plants/plants.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(watchStartup),
    fork(watchUsers),
    fork(watchPlants),
    //<-- INJECT MODULE SAGA -->
  ]);
}
