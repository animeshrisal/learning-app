import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddQuizDialogue = (props: any) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { isSubmitting } = formState;

  const handleClose = () => {
    props.handleClose();
  };

  const addQuiz = () => {
    // props.addQuiz({ name }, props.state);
    handleClose();
  };

  return (
    <Modal isOpen={props.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to set it as active ?</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={addQuiz}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuizDialogue;
