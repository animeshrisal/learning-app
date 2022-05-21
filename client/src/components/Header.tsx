import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";

function NavBar(props: any) {
  const auth = useSelector((reduxState: RootState) => reduxState.auth);

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
            <Button colorScheme="teal">Sign Out</Button>
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
