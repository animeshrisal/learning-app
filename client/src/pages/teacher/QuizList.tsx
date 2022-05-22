import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Quiz } from "../../models/states/QuizState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addQuiz, retrieveQuizList } from "../../slice/quizSlice";

import AddQuizDialogue from "../../components/AddQuizDialogue";
import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const StateChip = (props: any): JSX.Element => {
  if (props.state === "IN_REVIEW") {
    return <Badge colorScheme="green">In Review</Badge>;
  } else if (props.state === "ACTIVE") {
    return <Badge>Active</Badge>;
  } else {
    return <Badge>Archived</Badge>;
  }
};

const QuizList = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const { classroomId } = useParams();

  const quizList = useSelector((state: RootState) => state.quiz.quizList);

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveQuizList(classroomId));
    }
  }, [dispatch, classroomId]);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(true);
  };

  const handleClose: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setOpenModal(false);
  };
  const createQuiz = (quiz: Quiz) => {
    if (classroomId) {
      dispatch(addQuiz({ classroomId, quiz }));
    }
  };

  const goToQuizPage = (id: string | undefined) => {
    navigate(`${id}`);
  };

  return (
    <Flex flexDirection="column" bgColor="white">
      <Button onClick={handleClickOpen} colorScheme="teal" alignSelf="flex-end">
        Create Quiz
      </Button>
      <TableContainer margin="2rem">
        <Table variant="simple">
          <TableCaption>Quiz List</TableCaption>
          <Thead>
            <Tr>
              <Th width="80%">Quiz Name</Th>
              <Th>State</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {quizList.map((quiz) => (
              <Tr>
                <Td>{quiz.name}</Td>
                <Td>
                  <StateChip state={quiz.state} />
                </Td>
                <Td isNumeric>
                  <Button
                    onClick={() => goToQuizPage(quiz.id)}
                    colorScheme="teal"
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddQuizDialogue
        addQuiz={createQuiz}
        open={openModal}
        handleClose={handleClose}
      />
    </Flex>
  );
};

export default QuizList;
