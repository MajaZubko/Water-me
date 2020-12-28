import { expectSaga } from 'redux-saga-test-plan';

import { watchPlants } from '../plants.sagas';
import { plantsActions } from '..';
import { mockApi } from '../../../shared/utils/mockApi';

describe('Plants: sagas', () => {
  const defaultState = {};

  it('should implement a test', async () => {
    const data = { status: 'OK' };

    mockApi.get('/').reply(200, data);

    await expectSaga(watchPlants)
      .withState(defaultState)
      .put(plantsActions.fetchPlantsSuccess(data))
      .dispatch(plantsActions.fetchPlants())
      .silentRun();
  });
});
