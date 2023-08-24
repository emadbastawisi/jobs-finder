import { UsersLoginResponse, currentUser } from "./users-login";
import { UsersRegisterError, UsersRegisterResponse } from "./users-register.model";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: currentUser | null | undefined;
  isLoading: boolean;
  validationErrors: UsersRegisterError | null;
}
//UsersRegisterResponse |