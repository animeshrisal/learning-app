import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Login.scss";
import { Link } from "react-router-dom";

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
    e.preventDefault()
    dispatch(loginUser({ username, password }));
  };

  return (
    <div>
      <div className="container">
        <form className="login-form">
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            onChange={handleUsername}
            className="login-form-email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            onChange={handlePassword}
            className="login-form-password"
            placeholder="Enter your passsword"
          />
          <button onClick={handleLogin} className={"login-form-submit"}>
            {authState.isLoading ?  <Loader /> : <span>Login</span>}
            </button>
          <Link to="/forgot-password">
            <a>Forgot Password</a>
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
