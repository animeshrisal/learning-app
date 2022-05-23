import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";

import { Lesson } from "../../models/states/LessonState";
import { completeLesson, retrieveStudentLesson } from "../../slice/lessonSlice";

const StudentLesson = (props: any): JSX.Element => {
  const { classroomId, lessonId } = useParams();
  const lesson = useSelector((reduxState: RootState) =>
    reduxState.lesson.lessonList.find(
      (lesson: Lesson) => lesson.id === lessonId
    )
  );

  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.lesson.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (classroomId && lessonId) {
      dispatch(retrieveStudentLesson({ classroomId, lessonId }));
    }
  }, [classroomId, lessonId, dispatch]);

  const goToNextLesson = () => {
    navigate(`/student/${classroomId}/lesson/${lesson!.nextId}`);
  };

  const goToPreviousLesson = () => {
    navigate(`/student/${classroomId}/lesson/${lesson!.previousId}`);
  };

  const completeLessonHandler = () => {
    if (lessonId && classroomId) {
      dispatch(completeLesson({ lessonId, classroomId }));
    }
  };

  if (!isLoading && lesson) {
    return (
      <Box margin="2rem">
        <Flex>
          <ButtonGroup>
            <Button disabled={!lesson.previousId} onClick={goToPreviousLesson}>
              Previous Lesson
            </Button>
            <Button disabled={!lesson.nextId} onClick={goToNextLesson}>
              Next Lesson
            </Button>
          </ButtonGroup>
          <Spacer />
          {!lesson.completed ? (
            <Button onClick={completeLessonHandler}>Complete Lesson</Button>
          ) : (
            <Button disabled={true}>Completed</Button>
          )}
        </Flex>
        <Heading>{lesson.name}</Heading>
        <Box bgColor="white">
          <ReactMarkdown>{lesson.body}</ReactMarkdown>
        </Box>
      </Box>
    );
  } else {
    return <Spinner />;
  }
};

export default StudentLesson;
