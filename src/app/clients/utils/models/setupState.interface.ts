import { ResponseError, Skills, UserProfile } from './userProfile.models';

interface InitialState {
  isLoading: boolean;
  validationErrors: ResponseError | null;
}

export interface SetupStateInterface {
  userProfileSetup: UserProfile | null | undefined;
  skillsFilter: Skills[] | [];
  userProfile: InitialState;
  careerInterest: InitialState;
  generalInfo: InitialState;
  professionalInfo: InitialState;
  cv: InitialState;
  workExperience: InitialState;
  degree: InitialState;
  highschool: InitialState;
  language: InitialState;
  skills: InitialState;
}