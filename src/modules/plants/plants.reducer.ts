import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import * as plantsActions from './plants.actions';
import { PlantsState, Plant } from './plants.types';

export const INITIAL_STATE: PlantsState = {
  plants: [],
};

const handleFetchPlants = produce((draft: PlantsState) => {
  draft.plants = [];
});

const handleFetchPlantsSuccess = produce((draft: PlantsState, { payload }: PayloadAction<Plant[]>) => {
  draft.plants = payload;
});

const handleAddPlant = produce((draft: PlantsState, { payload }: PayloadAction<Plant>) => {
  draft.plants.push(payload);
});

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(plantsActions.fetchPlants, handleFetchPlants);
  // builder.addCase(plantsActions.fetchPlants.resolved, handleFetchPlantsSuccess);
  builder.addCase(plantsActions.addPlant, handleAddPlant);
});
