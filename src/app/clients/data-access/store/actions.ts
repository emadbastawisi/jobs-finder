import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UsersRegister, UsersRegisterError, UsersRegisterResponse } from "../../utils/models/users-register.model";
import { UsersLogin, UsersLoginError, UsersLoginResponse } from "../../utils/models/users-login";

// export const signup = createAction('[Clients] Signup', props<{ request: UsersRegister }>())

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    signup: props<{ request: UsersRegister }>(),
    signupSuccess: props<{ response: UsersRegisterResponse }>(),
    signupFailure: props<{ errors: UsersRegisterError}>(),
    login: props<{ request: FormData }>(),
    loginSuccess: props<{ response: UsersLoginResponse }>(),
    loginFailure: props<{ errors: UsersLoginError}>(),
    loginReset: emptyProps(),
  },
});




    