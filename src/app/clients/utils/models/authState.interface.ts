import { UsersLoginResponse } from "./users-login";
import { UsersRegisterError, UsersRegisterResponse } from "./users-register.model";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: UsersRegisterResponse | UsersLoginResponse | null | undefined;
  isLoading: boolean;
  validationErrors: UsersRegisterError | null;
}
