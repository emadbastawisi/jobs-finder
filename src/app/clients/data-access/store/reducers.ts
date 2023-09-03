import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../../utils/models/authState.interface';
import { authActions, setupActions } from './actions';
import { SetupStateInterface } from '../../utils/models/setupState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.signup, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.signupSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.signupFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.response.current_user,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.loginReset, (state) => ({
      ...state,
      validationErrors: null,
    })),
    on(authActions.logout, (state) => ({ ...state, currentUser: null })),
    on(authActions.getCurrentUser, (state) => ({ ...state, isLoading: true })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.response,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;

const initialsetupState: SetupStateInterface = {
  isSubmittingSetup: false,
  userProfileSetup: undefined,
  isLoadingSetup: false,
  validationErrorsSetup: null,
};

const setupFeature = createFeature({
  name: 'setup',
  reducer: createReducer(
    initialsetupState,
    on(setupActions.careerInterest, (state) => ({
      ...state,
      isSubmittingSetup: true,
      validationErrorsSetup: null,
    })),
    on(setupActions.careerInterestSuccess, (state, action) => ({
      ...state,
      isSubmittingSetup: false,
      userProfileSetup: action.response,
    })),
    on(setupActions.careerInterestFailure, (state, action) => ({
      ...state,
      isSubmittingSetup: false,
      validationErrorsSetup: action.errors,
    })),
    on(setupActions.getUserProfile, (state) => ({
      ...state,
      isLoadingSetup: true,
      validationErrorsSetup: null,
    })),
    on(setupActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoadingSetup: false,
      userProfileSetup: action.response,
    })),
    on(setupActions.getUserProfileFailure, (state, action) => ({
      ...state,
      isLoadingSetup: false,
      validationErrorsSetup: action.errors,
    }))
  ),
});

export const {
  name: setupFeatureKey,
  reducer: setupReducer,
  selectIsSubmittingSetup,
  selectIsLoadingSetup,
  selectUserProfileSetup,
  selectValidationErrorsSetup,
} = setupFeature;
