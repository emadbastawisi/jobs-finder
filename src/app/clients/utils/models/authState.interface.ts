import { UsersRegisterError, UsersRegisterResponse } from "./users-register.model";

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: UsersRegisterResponse | null | undefined;
  isLoading : boolean;
  validationErrors: UsersRegisterError | null;
}