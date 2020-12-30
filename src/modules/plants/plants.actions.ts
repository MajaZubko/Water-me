import { actionCreator } from '../helpers';
import { Plant } from './plants.types';

const { createAction } = actionCreator('PLANTS');

export const fetchPlants = createAction<void>('FETCH');

export const fetchPlantsSuccess = createAction<Plant[]>('FETCH_SUCCESS');

export const fetchPlantsFailure = createAction<Error>('FETCH_FAILURE');

export const addPlant = createAction<Plant>('ADD');

export const deletePlant = createAction<Plant>('DELETE');

export const editPlant = createAction<Plant>('EDIT');
