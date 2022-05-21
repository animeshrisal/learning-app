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
    <Box padding="0.5rem" boxShadow="0.5px 0.5px 1px">
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
              <Button colorScheme="teal">
                <Link to="/auth/register">Register</Link>
              </Button>
              <Button colorScheme="teal">
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default NavBar;
