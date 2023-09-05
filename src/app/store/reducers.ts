import { combineReducers } from '@ngrx/store';
import { authReducer, authFeatureKey } from './auth/auth.reducers';
import { setupReducer, setupFeatureKey } from './setup/setup.reducers';

export const reducers = combineReducers({
  [authFeatureKey]: authReducer,
  [setupFeatureKey]: setupReducer,
});