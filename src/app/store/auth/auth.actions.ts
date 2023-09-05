import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UsersLoginResponse, UsersLoginError, currentUser } from 'src/app/clients/utils/models/users-login';
import { UsersRegister, UsersRegisterResponse, UsersRegisterError } from 'src/app/clients/utils/models/users-register.model';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    signup: props<{ request: UsersRegister }>(),
    signupSuccess: props<{ response: UsersRegisterResponse }>(),
    signupFailure: props<{ errors: UsersRegisterError }>(),
    login: props<{ request: FormData }>(),
    loginSuccess: props<{ response: UsersLoginResponse }>(),
    loginFailure: props<{ errors: UsersLoginError }>(),
    loginReset: emptyProps(),
    logout: emptyProps(),
    getCurrentUser: emptyProps(),
    getCurrentUserSuccess: props<{ response: currentUser }>(),
    getCurrentUserFailure: emptyProps(),
  },
});

