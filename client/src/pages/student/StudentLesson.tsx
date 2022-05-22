import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";

import { Lesson } from "../../models/states/LessonState";
import { retrieveStudentLesson } from "../../slice/lessonSlice";

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
    navigate(
      `/student/${classroomId}/lesson/${lesson!.previousId}`
    );
  };

  const completeLesson = () => {
    
  }

  if (!isLoading && lesson) {
    return (
      <Box margin="2rem">
        <Flex justifyContent="flex-end">
          <ButtonGroup>
            {lesson.previousId && (
              <Button onClick={goToPreviousLesson}>Previous Lesson</Button>
            )}
            {lesson.nextId && (
              <Button onClick={goToNextLesson}>Next Lesson</Button>
            )}
          </ButtonGroup>
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
