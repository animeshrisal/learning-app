import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

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
    dispatch(loginUser(e));
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="60vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<TriangleDownIcon color="gray.300" />}
                  />
                  <Input
                    {...register("username")}
                    placeholder="Username"
                    id="username"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<TriangleDownIcon color="gray.300" />}
                  />
                  <Input
                    {...register("email")}
                    placeholder="Email"
                    id="email"
                    type="email"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<TriangleDownIcon color="gray.300" />}
                  />
                  <Input
                    {...register("password")}
                    placeholder="Password"
                    id="password"
                    type="password"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<TriangleDownIcon color="gray.300" />}
                  />
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    required
                  />
                </InputGroup>
              </FormControl>
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Register;
