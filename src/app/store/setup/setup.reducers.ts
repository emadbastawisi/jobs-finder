import { createFeature, createReducer, on } from '@ngrx/store';
import { setupActions } from './setup.actions';
import { SetupStateInterface } from 'src/app/clients/utils/models/setupState.interface';


const initialsetupState: SetupStateInterface = {
  userProfileSetup: undefined,
  userProfile: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  careerInterest: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  generalInfo: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  professionalInfo: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  cv: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  workExperience: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  },
  language: {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
  }
}
const setupFeature = createFeature({
  name: 'setup',
  reducer: createReducer(
    initialsetupState,
    on(setupActions.getUserProfile, (state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        isLoading: true,
        validationErrors: null,
      },
    })),
    on(setupActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      userProfile: {
        ...state.userProfile,
        isLoading: false,
      },
    })),
    on(setupActions.getUserProfileFailure, (state, action) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        isLoading: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.careerInterest, (state) => ({
      ...state,
      careerInterest: {
        ...state.careerInterest,
        isSubmitting: true,
        validationErrors: null,
      },
    })),
    on(setupActions.careerInterestSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      careerInterest: {
        ...state.careerInterest,
        isSubmitting: false,
      },
    })),
    on(setupActions.careerInterestFailure, (state, action) => ({
      ...state,
      careerInterest: {
        ...state.careerInterest,
        isSubmitting: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.generalInfo, (state) => ({
      ...state,
      generalInfo: {
        ...state.generalInfo,
        isSubmitting: true,
        validationErrors: null,
      },
    })),
    on(setupActions.generalInfoSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      generalInfo: {
        ...state.generalInfo,
        isSubmitting: false,
      },
    })),
    on(setupActions.generalInfoFailure, (state, action) => ({
      ...state,
      generalInfo: {
        ...state.generalInfo,
        isSubmitting: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.getCV, (state) => ({
      ...state,
      cv: {
        ...state.cv,
        isLoading: true,
        validationErrors: null,
      },
    })),
    on(setupActions.getCVSuccess, (state, action) => ({
      ...state,
      cv: {
        ...state.cv,
        isLoading: false,
      },
    })),
    on(setupActions.getCVFailure, (state, action) => ({
      ...state,
      cv: {
        ...state.cv,
        isLoading: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.addCV, (state) => ({
      ...state,
      cv: {
        ...state.cv,
        isSubmitting: true,
        validationErrors: null,
      },
    })),
    on(setupActions.addCVSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      cv: {
        ...state.cv,
        isSubmitting: false,
      },
    })),
    on(setupActions.addCVFailure, (state, action) => ({
      ...state,
      cv: {
        ...state.cv,
        isSubmitting: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.deleteCV, (state) => ({
      ...state,
      cv: {
        ...state.cv,
        isSubmitting: true,
        validationErrors: null,
      },
    })),
    on(setupActions.deleteCVSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      cv: {
        ...state.cv,
        isSubmitting: false,
      },
    })),
    on(setupActions.deleteCVFailure, (state, action) => ({
      ...state,
      cv: {
        ...state.cv,
        isSubmitting: false,
        validationErrors: action.errors,
      },
    })),
    on(setupActions.addWorkExperience, (state) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: true,
        validationErrors: null,
      }
    })),
    on(setupActions.addWorkExperienceSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
      }
    })),
    on(setupActions.addWorkExperienceFailure, (state, action) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
        validationErrors: action.errors,
      }
    })),
    on(setupActions.updateWorkExperience, (state) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: true,
        validationErrors: null,
      }
    })),
    on(setupActions.updateWorkExperienceSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
      }
    })),
    on(setupActions.updateWorkExperienceFailure, (state, action) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
        validationErrors: action.errors,
      }
    })),
    on(setupActions.deleteWorkExperience, (state) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: true,
        validationErrors: null,
      }
    })),
    on(setupActions.deleteWorkExperienceSuccess, (state, action) => ({
      ...state,
      userProfileSetup: action.response,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
      }
    })),
    on(setupActions.deleteWorkExperienceFailure, (state, action) => ({
      ...state,
      workExperience: {
        ...state.workExperience,
        isSubmitting: false,
        validationErrors: action.errors,
      }
    }))
  ),
});



export const {
  name: setupFeatureKey,
  reducer: setupReducer,
  selectSetupState,
  selectUserProfileSetup,
} = setupFeature;
