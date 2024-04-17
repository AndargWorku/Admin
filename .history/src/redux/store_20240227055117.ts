// redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import permissionsReducer from './permissions/reducers';
import rolesReducer from './roles/reducers';

const rootReducer = combineReducers({
  permissions: permissionsReducer,
  roles: rolesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
