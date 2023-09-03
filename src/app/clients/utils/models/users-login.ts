export interface UsersLogin {
  username: string;
  password: string;
}

export interface UsersLoginError {
  [key: string]: string[]
}
 
export interface currentUser {
  id: number
  first_name: string
  last_name: string
  email: string
  created_at: string
}
export interface UsersLoginResponse {
  access_token: string;
  token_type: string;
  current_user: currentUser;
}

