import { handleResponse, URL } from "../helpers";
import { UserLoginRequest, UserRegisterRequest } from "../models/requests/UserRequest";
import { AuthState } from "../models/states/AuthState";

export const authenticationService = {
  login,
  logout,
  register,
};

function login(user: UserLoginRequest): Promise<AuthState> {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("password", user.password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/auth/login`, requestOptions)
    .then(handleResponse)
    .then((user: AuthState) => {
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function register(user: UserRegisterRequest ): Promise<AuthState>{
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("password", user.password);
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("email", user.email);
  formData.append("passwordConfirmation", user.passwordConfirmation);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/auth/users/`, requestOptions)
    .then(handleResponse)
    .then((user: AuthState) => {
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

