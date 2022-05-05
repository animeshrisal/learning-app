import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

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

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <div>
      {" "}
      <Loader />
    </div>
  );
}

export default Login;
