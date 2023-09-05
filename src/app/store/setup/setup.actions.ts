import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  CV,
  ResponseError,
  UserCareerInterests,
  UserEducation,
  UserLanguage,
  UserPersonalInfo,
  UserProfile,
  UserWorkExperience,
} from '../../clients/utils/models/userProfile.models';

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
    addCV: props<{ request: CV }>(),
    addCVSuccess: props<{ response: UserProfile }>(),
    addCVFailure: props<{ errors: ResponseError }>(),
    deleteCV: emptyProps(),
    deleteCVSuccess: props<{ response: UserProfile }>(),
    deleteCVFailure: props<{ errors: ResponseError }>(),
    addWorkExperience: props<{ request: UserWorkExperience }>(),
    addWorkExperienceSuccess: props<{ response: UserProfile }>(),
    addWorkExperienceFailure: props<{ errors: ResponseError }>(),
    deleteWorkExperience: emptyProps(),
    deleteWorkExperienceSuccess: props<{ response: UserProfile }>(),
    deleteWorkExperienceFailure: props<{ errors: ResponseError }>(),
    addLanguage: props<{ request: UserLanguage }>(),
    addLanguageSuccess: props<{ response: UserProfile }>(),
    addLanguageFailure: props<{ errors: ResponseError }>(),
    deleteLanguage: emptyProps(),
    deleteLanguageSuccess: props<{ response: UserProfile }>(),
    deleteLanguageFailure: props<{ errors: ResponseError }>()
  },
});