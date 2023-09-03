import { ResponseError, UserProfile } from './userProfile.models';

export interface SetupStateInterface {
  isSubmittingSetup: boolean;
  isLoadingSetup: boolean;
  userProfileSetup: UserProfile | null | undefined;
  validationErrorsSetup: ResponseError | null;
}
