import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../../utils/models/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.signup, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
    on(authActions.signupSuccess, (state, action) => ({ ...state, isSubmitting: false})),
    on(authActions.signupFailure, (state, action) => ({ ...state, isSubmitting: false, validationErrors: action.errors })),
    on(authActions.login, (state) => ({ ...state, isSubmitting: true , validationErrors: null })),
    on(authActions.loginSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.response.current_user })),
    on(authActions.loginFailure, (state, action) => ({ ...state, isSubmitting: false, validationErrors: action.errors })),
    on(authActions.loginReset, (state) => ({ ...state, validationErrors: null })),
    on(authActions.logout, (state) => ({ ...state, currentUser: null })),
    on(authActions.getCurrentUser, (state) => ({ ...state, isLoading: true })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({ ...state, isLoading: false, currentUser: action.response })),
    on(authActions.getCurrentUserFailure, (state) => ({ ...state, isLoading: false })),

  ),
})

export const { 
  name: authFeatureKey,
  reducer: authReducer,
   selectIsSubmitting,
   selectIsLoading,selectCurrentUser,
   selectValidationErrors
  } = authFeature;