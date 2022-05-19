import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.token !== "") {
      switch (authState.role) {
        case "ADMIN": {
          navigate("/admin");
          break;
        }
        case "TEACHER": {
          navigate("/teacher/");
          break;
        }
        case "USER": {
          navigate("/student/");
          break;
        }
      }
    }
  }, [authState.token, authState.role, navigate]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div>
      <div className="container">
        <form className="login-form">
          <h2>Sign In</h2>
          <input
            autoComplete="off"
            type="text"
            name="username"
            onChange={handleUsername}
            className="login-form-input"
            placeholder="Enter your username"
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            onChange={handlePassword}
            className="login-form-input"
            placeholder="Enter your passsword"
          />
          <button onClick={handleLogin} className={"login-form-submit"}>
            {authState.isLoading ? <Spinner /> : <span>Login</span>}
          </button>
          <Link to="/auth/forgot-password">
            <span>Forgot Password</span>
          </Link>
          <Link to="/auth/register">
            <span>Not a member ? Create a new account</span>
          </Link>
        </form>
        <div className="side">
          <div className="side-content"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
