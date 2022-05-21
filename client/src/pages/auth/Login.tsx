import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UserLoginRequest } from "../../models/requests/UserRequest";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  const [data, setData] = useState("");

  const navigate = useNavigate();

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

  const handleLogin = (data: any) => {
    dispatch(loginUser(data));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl>
          <FormLabel htmlFor="username">Email address</FormLabel>
          <Input
            {...register("username")}
            placeholder="First name"
            id="username"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            {...register("password")}
            placeholder="Password"
            id="password"
            type="password"
          />
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
            Login
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Login;
