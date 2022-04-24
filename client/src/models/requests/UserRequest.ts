export interface BaseUserRequest {
  username: string;
  password: string;
}

export interface UserRegisterRequest extends BaseUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  passwordConfirmation: string;
}

export interface UserLoginRequest extends BaseUserRequest {}

export interface ActivateUser {
  uid: string;
  token: string;
}
