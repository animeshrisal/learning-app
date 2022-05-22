import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import { retrieveStudentLessonList } from "../../slice/lessonSlice";
import {
  enrollStudent,
  retrieveStudentClassroom,
} from "../../slice/classroomSlice";
import { Lesson } from "../../models/states/LessonState";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const StudentClassroom = (props: any): JSX.Element => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const classroom = useSelector((state: RootState) =>
    state.classroom.classroomList.find(
      (classroom) => classroom.id === classroomId
    )
  );

  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.lesson.isLoading);
  const lessonList: Lesson[] = useSelector(
    (state: RootState) => state.lesson.lessonList
  );

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveStudentClassroom(classroomId));
      dispatch(retrieveStudentLessonList(classroomId));
    }
  }, [classroomId, dispatch]);

  const createEnrollment = () => {
    if (classroomId) {
      dispatch(enrollStudent(classroomId));
    }
  };

  const goToUserQuiz = () => {
    navigate(`quiz_list/`);
  };

  const goToLessonPage = (id: string) => {
    navigate(`lesson/${id}`);
  };

  if (!isLoading) {
    return (
      <Flex direction="column">
        <Accordion>
          {lessonList.map((lesson: Lesson) => (
            <AccordionItem key={lesson.id}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="bold">{lesson.name}</Text>
                  </Box>
                  {lesson.completed && <FontAwesomeIcon icon={faCheck} />}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box>{lesson.description}</Box>
                <Flex justifyContent="flex-end">
                  <Button
                    onClick={() => goToLessonPage(lesson.id!)}
                    colorScheme="teal"
                  >
                    Go to lesson
                  </Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    );
  } else {
    return <Spinner />;
  }
};

export default StudentClassroom;
