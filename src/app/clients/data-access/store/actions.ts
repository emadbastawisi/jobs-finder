import { createActionGroup, props } from "@ngrx/store";
import { UsersRegister, UsersRegisterError, UsersRegisterResponse } from "../../utils/models/users-register.model";

// export const signup = createAction('[Clients] Signup', props<{ request: UsersRegister }>())

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    signup: props<{ request: UsersRegister }>(),
    signupSuccess: props<{ response: UsersRegisterResponse }>(),
    signupFailure: props<{ errors: UsersRegisterError}>(),
  },
});



    