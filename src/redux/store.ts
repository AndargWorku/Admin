// redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import permissionsReducer from './reducers/permissionsReducers';
import rolesReducer from './reducers/rolesReducers';
import shopReducer from './reducers/shopReducer';

const rootReducer = combineReducers({
  permissions: permissionsReducer,
  roles: rolesReducer,
  shope:shopReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
