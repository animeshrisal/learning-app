import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
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

  useEffect(() => {
    if (classroomId && lessonId) {
      dispatch(retrieveStudentLesson({ classroomId, lessonId }));
    }
  }, [classroomId, lessonId, dispatch]);

  if (!isLoading && lesson) {
    return (
      <div>
        <ReactMarkdown>{lesson.body}</ReactMarkdown>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default StudentLesson;
