import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  UsersRegister,
  UsersRegisterError,
  UsersRegisterResponse,
} from '../../utils/models/users-register.model';
import {
  UsersLogin,
  UsersLoginError,
  UsersLoginResponse,
  currentUser,
} from '../../utils/models/users-login';
import {
  ResponseError,
  UserCareerInterests,
  UserPersonalInfo,
  UserProfile,
} from '../../utils/models/userProfile.models';

// export const signup = createAction('[Clients] Signup', props<{ request: UsersRegister }>())

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

export const setupActions = createActionGroup({
  source: 'Setup',
  events: {
    moveToNextStep: emptyProps(),
    getUserProfile: emptyProps(),
    getUserProfileSuccess: props<{ response: UserProfile }>(),
    getUserProfileFailure: props<{ errors: ResponseError }>(),
    careerInterest: props<{ request: UserCareerInterests }>(),
    careerInterestSuccess: props<{ response: UserProfile }>(),
    careerInterestFailure: props<{ errors: ResponseError }>(),
    generalInfo: props<{ request: UserPersonalInfo }>(),
    generalInfoSuccess: props<{ response: UserProfile }>(),
    generalInfoFailure: props<{ errors: ResponseError }>(),
  },
});
