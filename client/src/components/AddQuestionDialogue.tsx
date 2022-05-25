import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
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
  SimpleGrid,
  Stack,
  Text,
  useControllableProp,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";

import { Controller, useController, useForm } from "react-hook-form";

const questionChoiceList = [
  { placeholder: "First Choice", id: "firstChoice" },
  { placeholder: "Second Choice", id: "secondChoice" },
  { placeholder: "Third Choice", id: "thirdChoice" },
  { placeholder: "Fourth Choice", id: "fourthChoice" },
];

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const AddQuestionDialogue = (props: any) => {
  const { register, handleSubmit, formState } = useForm();
  const [radioValue, setRadioValue] = useState('0')

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
    } = data;

    props.addQuestionToQuiz(
      {
        question,
        firstChoice,
        secondChoice,
        thirdChoice,
        fourthChoice,
        radioValue
      },
      props.state
    );
    handleClose();
  };
  const { getRadioProps } = useRadioGroup({
    name: "correctAnswer",
    defaultValue: radioValue,
    onChange: console.log,
  });
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
                {questionChoiceList.map((questionChoice, index) => {
                  const radio = getRadioProps({ value: `${index}` });
                  return (
                    <Flex direction="row">
                      <FormControl>
                        <Input
                          {...register(`${questionChoice.id}` as const)}
                          placeholder={questionChoice.placeholder}
                          id={questionChoice.id}
                          type="text"
                        />
                      </FormControl>
                      <RadioCard value={`${index}`} {...radio}>
                        Correct
                      </RadioCard>
                    </Flex>
                  );
                })}
              </Stack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit(addQuestion)}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuestionDialogue;
