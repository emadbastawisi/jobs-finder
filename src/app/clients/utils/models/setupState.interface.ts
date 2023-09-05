import { ResponseError, UserProfile } from './userProfile.models';


// export interface isSubmittingSetup {
//   userProfile: boolean;
//   careerInterest: boolean;
//   generalInfo: boolean;
//   professionalInfo: boolean;
//   cv: boolean;
//   workExperience: boolean;
//   language: boolean;
// }
// export interface isLoadingSetup {
//   userProfile: boolean;
//   careerInterest: boolean;
//   generalInfo: boolean;
//   professionalInfo: boolean;
//   cv: boolean;
//   workExperience: boolean;
//   language: boolean;
// }

// export interface validationErrorsSetup {
//   userProfile: ResponseError | null;
//   careerInterest: ResponseError | null;
//   generalInfo: ResponseError | null;
//   professionalInfo: ResponseError | null;
//   cv: ResponseError | null;
//   workExperience: ResponseError | null;
//   language: ResponseError | null;
// }



// export interface SetupStateInterface {
//   isSubmittingSetup: isSubmittingSetup;
//   isLoadingSetup: isLoadingSetup;
//   userProfileSetup: UserProfile | null | undefined;
//   validationErrorsSetup: validationErrorsSetup | null;
// }


export interface SetupStateInterface {
  userProfileSetup: UserProfile | null | undefined;
  userProfile: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  careerInterest: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  generalInfo: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  professionalInfo: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  cv: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  workExperience: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };
  language: {
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: ResponseError | null;
  };

}