import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from '../../config/reducers';

export const selectPlantsDomain = (state: GlobalState) => state.plants;

export const selectPlants = createSelector(selectPlantsDomain, (state) => state.plants);
