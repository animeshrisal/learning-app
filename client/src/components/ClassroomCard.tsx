// Sample card from Airbnb

import { Badge, Box, Image } from "@chakra-ui/react";
import { ClassroomProps } from "../models/states/ClassroomState";

export function ClassroomCard(props: ClassroomProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" maxHeight="20rem">
      <Box maxW="sm" height="15rem" overflow="hidden">
      <Image  overflow="hidden"  src={`http://127.0.0.1:8000/uploads/${props.image}`} alt={props.subject} />
      </Box>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {props.subject}
        </Box>

        <Box>{props.description}</Box>
      </Box>
    </Box>
  );
}
