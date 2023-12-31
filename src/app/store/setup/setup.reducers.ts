import { createFeature, createReducer, on } from '@ngrx/store';
import { setupActions } from './setup.actions';
import { SetupStateInterface } from 'src/app/clients/utils/models/setupState.interface';


const createLoadingState = (state: any, key: any) => ({
  ...state,
  [key]: {
    ...state[key],
    isLoading: true,
    validationErrors: null,
  },
});

const createSuccessState = (state: any, key: any, action: any) => ({
  ...state,
  userProfileSetup: action.response,
  [key]: {
    ...state[key],
    isLoading: false,
  },
});

const createFailureState = (state: any, key: any, action: any) => ({
  ...state,
  [key]: {
    ...state[key],
    isLoading: false,
    validationErrors: action.errors,
  },
});
const createInitialState = () => ({
  isLoading: false,
  validationErrors: null,
});

const initialsetupState: SetupStateInterface = {
  userProfileSetup: undefined,
  skillsFilter: [],
  userProfile: createInitialState(),
  careerInterest: createInitialState(),
  generalInfo: createInitialState(),
  professionalInfo: createInitialState(),
  cv: createInitialState(),
  workExperience: createInitialState(),
  degree: createInitialState(),
  highschool: createInitialState(),
  language: createInitialState(),
  skills: createInitialState(),
};



const setupFeature = createFeature({
  name: 'setup',
  reducer: createReducer(
    initialsetupState,
    on(setupActions.getUserProfile, (state) => createLoadingState(state, 'userProfile')),
    on(setupActions.getUserProfileSuccess, (state, action) => createSuccessState(state, 'userProfile', action)),
    on(setupActions.getUserProfileFailure, (state, action) => createFailureState(state, 'userProfile', action)),
    on(setupActions.careerInterest, (state) => createLoadingState(state, 'careerInterest')),
    on(setupActions.careerInterestSuccess, (state, action) => createSuccessState(state, 'careerInterest', action)),
    on(setupActions.careerInterestFailure, (state, action) => createFailureState(state, 'careerInterest', action)),
    on(setupActions.generalInfo, (state) => createLoadingState(state, 'generalInfo')),
    on(setupActions.generalInfoSuccess, (state, action) => createSuccessState(state, 'generalInfo', action)),
    on(setupActions.generalInfoFailure, (state, action) => createFailureState(state, 'generalInfo', action)),
    on(setupActions.addCV, (state) => createLoadingState(state, 'cv')),
    on(setupActions.addCVSuccess, (state, action) => createSuccessState(state, 'cv', action)),
    on(setupActions.addCVFailure, (state, action) => createFailureState(state, 'cv', action)),
    on(setupActions.deleteCV, (state) => createLoadingState(state, 'cv')),
    on(setupActions.deleteCVSuccess, (state, action) => createSuccessState(state, 'cv', action)),
    on(setupActions.deleteCVFailure, (state, action) => createFailureState(state, 'cv', action)),
    on(setupActions.getCV, (state) => createLoadingState(state, 'cv')),
    on(setupActions.getCVSuccess, (state) => ({ ...state, cv: { ...state.cv, isLoading: false, } })),
    on(setupActions.getCVFailure, (state, action) => createFailureState(state, 'cv', action)),
    on(setupActions.addWorkExperience, (state) => createLoadingState(state, 'workExperience')),
    on(setupActions.addWorkExperienceSuccess, (state, action) => createSuccessState(state, 'workExperience', action)),
    on(setupActions.addWorkExperienceFailure, (state, action) => createFailureState(state, 'workExperience', action)),
    on(setupActions.updateWorkExperience, (state) => createLoadingState(state, 'workExperience')),
    on(setupActions.updateWorkExperienceSuccess, (state, action) => createSuccessState(state, 'workExperience', action)),
    on(setupActions.updateWorkExperienceFailure, (state, action) => createFailureState(state, 'workExperience', action)),
    on(setupActions.deleteWorkExperience, (state) => createLoadingState(state, 'workExperience')),
    on(setupActions.deleteWorkExperienceSuccess, (state, action) => createSuccessState(state, 'workExperience', action)),
    on(setupActions.deleteWorkExperienceFailure, (state, action) => createFailureState(state, 'workExperience', action)),
    on(setupActions.addLanguage, (state) => createLoadingState(state, 'language')),
    on(setupActions.addLanguageSuccess, (state, action) => createSuccessState(state, 'language', action)),
    on(setupActions.addLanguageFailure, (state, action) => createFailureState(state, 'language', action)),
    on(setupActions.updateLanguage, (state) => createLoadingState(state, 'language')),
    on(setupActions.updateLanguageSuccess, (state, action) => createSuccessState(state, 'language', action)),
    on(setupActions.updateLanguageFailure, (state, action) => createFailureState(state, 'language', action)),
    on(setupActions.deleteLanguage, (state) => createLoadingState(state, 'language')),
    on(setupActions.deleteLanguageSuccess, (state, action) => createSuccessState(state, 'language', action)),
    on(setupActions.deleteLanguageFailure, (state, action) => createFailureState(state, 'language', action)),
    on(setupActions.getSkills, (state) => createLoadingState(state, 'skillsFilter')),
    on(setupActions.getSkillsSuccess, (state, action) => ({ ...state, skillsFilter: action.response })),
    on(setupActions.getSkillsFailure, (state, action) => createFailureState(state, 'skillsFilter', action)),
    on(setupActions.addDegree, (state) => createLoadingState(state, 'degree')),
    on(setupActions.addDegreeSuccess, (state, action) => createSuccessState(state, 'degree', action)),
    on(setupActions.addDegreeFailure, (state, action) => createFailureState(state, 'degree', action)),
    on(setupActions.addHighSchool, (state) => createLoadingState(state, 'highschool')),
    on(setupActions.addHighSchoolSuccess, (state, action) => createSuccessState(state, 'highschool', action)),
    on(setupActions.addHighSchoolFailure, (state, action) => createFailureState(state, 'highschool', action)),
    on(setupActions.addSkills, (state) => createLoadingState(state, 'skills')),
    on(setupActions.addSkillsSuccess, (state, action) => createSuccessState(state, 'skills', action)),
    on(setupActions.addSkillsFailure, (state, action) => createFailureState(state, 'skills', action)
    ),
  ),
});



export const {
  name: setupFeatureKey,
  reducer: setupReducer,
  selectSetupState,
  selectUserProfileSetup,
  selectSkillsFilter,
} = setupFeature;
