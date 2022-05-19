import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handlePasswordConfirmation = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(event.target.value);

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
          <h2>Register</h2>
          <input
            autoComplete="off"
            type="text"
            name="username"
            onChange={handleUsername}
            className="login-form-input"
            placeholder="Enter a username"
          />
            <input
            autoComplete="off"
            type="email"
            name="email"
            onChange={handleEmail}
            className="login-form-input"
            placeholder="Enter your email"
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            onChange={handlePassword}
            className="login-form-input"
            placeholder="Enter your passsword"
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            onChange={handlePasswordConfirmation}
            className="login-form-input"
            placeholder="Type your password again"
          />
          <button onClick={handleLogin} className={"login-form-submit"}>
            {authState.isLoading ? <Spinner /> : <span>Register</span>}
          </button>
          <Link to="/auth/forgot-password">
            <span>Forgot Password</span>
          </Link>
          <Link to="/auth/login">
            <span>Already a member ? Login</span>
          </Link>

        </form>
        <div className="side">
          <div className="side-content"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
