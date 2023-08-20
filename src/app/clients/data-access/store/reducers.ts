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
    on(authActions.signup, (state) => ({ ...state, isSubmitting: true , validationErrors: null })),
    on(authActions.signupSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.response })),
    on(authActions.signupFailure, (state, action) => ({ ...state, isSubmitting: false, validationErrors: action.errors })),),
})

export const { 
  name: authFeatureKey,
  reducer: authReducer,
   selectIsSubmitting,
   selectIsLoading,selectCurrentUser,
   selectValidationErrors
  } = authFeature;