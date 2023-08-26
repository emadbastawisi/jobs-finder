export interface UsersRegister {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
}
export interface UsersRegisterResponse {
  id: number | null;
  username: string | null;
  email: string | null;
  created_at: string | null;
}
export interface UsersRegisterError {
  [key: string]: string[]
}