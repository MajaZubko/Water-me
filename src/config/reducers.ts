import { combineReducers } from 'redux';

import { reducer as localesReducer } from '../modules/locales/locales.reducer';
import { LocalesState } from '../modules/locales/locales.types';
import { reducer as startupReducer } from '../modules/startup/startup.reducer';
import { StartupState } from '../modules/startup/startup.types';
import { reducer as usersReducer } from '../modules/users/users.reducer';
import { UsersState } from '../modules/users/users.types';
import { reducer as plantsReducer } from '../modules/plants/plants.reducer';
import { PlantsState } from '../modules/plants/plants.types';
//<-- IMPORT MODULE REDUCER -->

export type GlobalState = {
  locales: LocalesState;
  startup: StartupState;
  users: UsersState;
  plants: PlantsState;
  //<-- INJECT MODULE STATE TYPE -->
};

export default function createReducer() {
  return combineReducers({
    locales: localesReducer,
    startup: startupReducer,
    users: usersReducer,
    plants: plantsReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
