import { createAction, props } from "@ngrx/store";
import { UsersRegister } from "../../utils/models/users-register.model";

export const signup = createAction('[Clients] Signup', props<{ request: UsersRegister }>())