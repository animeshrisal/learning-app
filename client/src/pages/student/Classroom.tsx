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
  Spinner,
} from "@chakra-ui/react";

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
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return <Spinner />;
  }
};

export default StudentClassroom;
