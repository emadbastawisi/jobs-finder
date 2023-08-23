export interface UsersLogin {
  username: string;
  password: string;
}
export interface UsersLoginResponse {
  username: string;
  access_token: string;
  token_type: string;
}
export interface UsersLoginError {
  [key: string]: string[]
}

