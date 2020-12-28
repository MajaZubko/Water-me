import { actionCreator } from '../helpers';
import { PlantsState, Plant } from './plants.types';

const { createPromiseAction } = actionCreator('PLANTS');

export const fetchPlants = createPromiseAction<void, PlantsState>('FETCH');

export const addPlant = createPromiseAction<Plant, PlantsState>('ADD');

export const deletePlant = createPromiseAction<Plant, PlantsState>('DELETE');

export const editPlant = createPromiseAction<Plant, PlantsState>('EDIT');
