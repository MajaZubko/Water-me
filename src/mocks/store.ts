import { produce } from 'immer';

import { GlobalState } from '../config/reducers';
import { LOCALES_INITIAL_STATE } from '../modules/locales';
import { STARTUP_INITIAL_STATE } from '../modules/startup';
import { USERS_INITIAL_STATE } from '../modules/users';
import { PLANTS_INITIAL_STATE } from '../modules/plants';
//<-- IMPORT MODULE STATE -->

export const store: GlobalState = {
  locales: LOCALES_INITIAL_STATE,
  startup: STARTUP_INITIAL_STATE,
  users: USERS_INITIAL_STATE,
  plants: PLANTS_INITIAL_STATE,
  //<-- INJECT MODULE STATE -->
};

export const prepareState = (stateSetter: (draftState: GlobalState) => void) => produce(store, stateSetter);
