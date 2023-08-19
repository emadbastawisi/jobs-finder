import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../../utils/models/authState.interface";
import { signup } from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(signup, (state) => ({ ...state, isSubmitting: true })),
  ),
})

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting } = authFeature
  ;