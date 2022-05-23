import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddQuizDialogue = (props: any) => {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const handleClose = () => {
    props.handleClose();
  };

  const addQuiz = (data: any) => {
    const { name } = data;
    console.log(name)
    props.addQuiz({ name }, props.state);
    handleClose();
  };

  return (
    <Modal isOpen={props.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <Input
                    {...register("name")}
                    placeholder="Name"
                    id="name"
                    type="text"
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit(addQuiz)}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuizDialogue;
