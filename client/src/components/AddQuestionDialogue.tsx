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
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import Textarea from "@uiw/react-md-editor/lib/components/TextArea/Textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddQuestionDialogue = (props: any) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { isSubmitting } = formState;

  const handleClose = () => {
    resetForm();
    props.handleClose();
  };

  const addQuestion = (data: any) => {
    const {
      question,
      firstChoice,
      secondChoice,
      thirdChoice,
      fourthChoice,
      correctChoice,
    } = data;

    props.addQuestionToQuiz(
      {
        question,
        firstChoice,
        secondChoice,
        thirdChoice,
        fourthChoice,
        correctChoice,
      },
      props.state
    );
    handleClose();
  };

  const resetForm = () => {};

  return (
    <Modal isOpen={props.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Question</ModalHeader>
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
                    {...register("question")}
                    placeholder="Question"
                    id="question"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("firstChoice")}
                    placeholder="First Choice"
                    id="firstChoice"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("secondChoice")}
                    placeholder="Second Choice"
                    id="secondChoice"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("thirdChoice")}
                    placeholder="Third Choice"
                    id="thirdChoice"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("fourthChoice")}
                    placeholder="Fourth Choice"
                    id="fourthChoice"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <RadioGroup>
                    <Text>Choose the correct Choice</Text>
                    <Stack direction="row">
                      <Radio value="1">First</Radio>
                      <Radio value="2">Second</Radio>
                      <Radio value="3">Third</Radio>
                      <Radio value="4">Fourth</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit(addQuestion)}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuestionDialogue;
