import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { logoutUser } from "../slice/authSlice";

function NavBar(props: any) {
  const auth = useSelector((reduxState: RootState) => reduxState.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Box
      backgroundColor="whiteAlpha.900"
      padding="0.5rem"
      boxShadow="0.5px 0.5px 1px"
    >
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">
            <Link to="/">Learning App</Link>
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          {auth.token ? (
            <Button onClick={handleLogout} colorScheme="teal">
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/auth/register">
                <Button colorScheme="teal">Register</Button>
              </Link>

              <Link to="/auth/login">
                <Button colorScheme="teal">Sign In</Button>
              </Link>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default NavBar;
