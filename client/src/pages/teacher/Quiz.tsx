import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Question } from "../../models/states/QuestionState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import questionSlice, {
  addQuestion,
  retrieveQuestionList,
} from "../../slice/questionSlice";
import {
  retrieveQuiz,
  setQuizAsActive,
  setQuizAsArchived,
} from "../../slice/quizSlice";
import AddQuestionDialogue from "../../components/AddQuestionDialogue";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoffee, faUser } from "@fortawesome/free-solid-svg-icons";

const SetQuizAsActiveModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsActive = () => {
    props.setQuizAsActive();
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
          <Button variant="ghost" onClick={setQuizAsActive}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SetQuizAsArchivedModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsArchived = () => {
    props.setQuizAsArchived();
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
          <Button variant="ghost" onClick={setQuizAsArchived}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const QuestionCard = (props: Question) => {
  return (
    <Box margin="2rem" padding="2rem">
      <Heading>{props.question}</Heading>
      <Flex flexDirection="row">
        {props.firstChoice}
        <Spacer />
        {props.correctChoice === 1 && <FontAwesomeIcon icon={faCheck} />}
      </Flex>
      <Box>
        <Flex flexDirection="row">
          {props.secondChoice}
          <Spacer />
          {props.correctChoice === 2 && <FontAwesomeIcon icon={faCheck} />}
        </Flex>
      </Box>
      <Box>
        <Flex flexDirection="row">
          {props.thirdChoice}
          <Spacer />
          {props.correctChoice === 3 && <FontAwesomeIcon icon={faCheck} />}
        </Flex>
      </Box>
      <Box>
        <Flex flexDirection="row">
          {props.fourthChoice}
          <Spacer />
          {props.correctChoice === 4 && <FontAwesomeIcon icon={faCheck} />}
        </Flex>
      </Box>
    </Box>
  );
};

const Quiz = (props: any) => {
  const [state, setState] = useState("");

  const { classroomId, quizId } = useParams();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedState, setSelectedState] = useState("Add");
  const [openQuizActiveModal, setOpenQuizActiveModal] = useState(false);
  const [openQuizArchivedModal, setOpenQuizArchivedModal] = useState(false);

  const quiz = useSelector((state: RootState) =>
    state.quiz.quizList.find((quiz) => quiz.id === quizId)
  );

  const questionList = useSelector(
    (state: RootState) => state.question.questionList
  );

  const isLoading = useSelector((state: RootState) => state.question.isLoading);
  useEffect(() => {
    if (classroomId && quizId) {
      dispatch(retrieveQuiz({ quizId, classroomId }));
      dispatch(retrieveQuestionList({ classroomId, quizId }));
    }
  }, [dispatch, classroomId, quizId]);

  const handleClickOpen = () => {
    setSelectedRow(0);
    setSelectedState("Add");
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSelectedRow = (id: any) => {
    setSelectedRow(id);
    setSelectedState("Edit");
    setOpenModal(true);
  };

  const addQuestionToQuiz = (question: Question) => {
    if (classroomId && quizId) {
      dispatch(addQuestion({ classroomId, quizId, question }));
    }
  };

  const setQuizAsActiveFunction = () => {
    if (classroomId && quizId) {
      dispatch(setQuizAsActive({ classroomId, quizId }));
      handleCloseQuizActiveModal();
    }
  };

  const handleOpenQuizActiveModal = (e: any) => {
    setOpenQuizActiveModal(true);
  };

  const handleCloseQuizActiveModal = () => {
    setOpenQuizActiveModal(false);
  };

  const setQuizAsArchivedFunction = () => {
    if (classroomId && quizId) {
      dispatch(setQuizAsArchived({ classroomId, quizId }));
      handleCloseQuizArchivedModal();
    }
  };

  const handleOpenQuizArchivedModal = (e: any) => {
    setOpenQuizArchivedModal(true);
  };

  const handleCloseQuizArchivedModal = () => {
    setOpenQuizArchivedModal(false);
  };

  if (!isLoading) {
    return (
      <>
        <ButtonGroup>
          {quiz?.state === "IN_REVIEW" && (
            <Button onClick={handleOpenQuizActiveModal}>Set as active </Button>
          )}
          {quiz?.state === "ACTIVE" && (
            <Button onClick={handleOpenQuizArchivedModal}>
              Set as archived
            </Button>
          )}
          {quiz?.state === "ARCHIVED" && <div>Archived </div>}
          <Button onClick={handleClickOpen}>Add new question </Button>
        </ButtonGroup>
        <Container bgColor="white">
          <Stack>
            {questionList.map((question, index) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </Stack>
        </Container>

        <AddQuestionDialogue
          addQuestionToQuiz={addQuestionToQuiz}
          classroomId={classroomId}
          handleClose={handleClose}
          open={openModal}
          selectedRow={selectedRow}
          state={selectedState}
          quizId={quizId}
        />

        <SetQuizAsActiveModal
          open={openQuizActiveModal}
          handleClose={handleCloseQuizActiveModal}
          setQuizAsActive={setQuizAsActiveFunction}
        />

        <SetQuizAsArchivedModal
          open={openQuizArchivedModal}
          handleClose={handleCloseQuizArchivedModal}
          setQuizAsArchived={setQuizAsArchivedFunction}
        />
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default Quiz;
