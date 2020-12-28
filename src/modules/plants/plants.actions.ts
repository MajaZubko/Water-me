import { actionCreator } from '../helpers';
import { PlantsState } from './plants.types';

const { createPromiseAction } = actionCreator('PLANTS');

export const fetchPlants = createPromiseAction<void, PlantsState>('FETCH');
