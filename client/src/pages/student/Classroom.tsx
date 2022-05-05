
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import { retrieveStudentLessonList } from "../../slice/lessonSlice";
import { enrollStudent, retrieveStudentClassroom } from "../../slice/classroomSlice";
import { Lesson } from "../../models/states/LessonState";

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
  const lessonList: Lesson[] = useSelector((state: RootState) => state.lesson.lessonList);

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveStudentClassroom(classroomId));
      dispatch(retrieveStudentLessonList(classroomId));
    }
  }, [classroomId, dispatch]);

  const createEnrollment = () => {
    if (classroomId) {
      dispatch(enrollStudent(classroomId))
    }
  };

  const goToUserQuiz = () => {
    navigate(`quiz_list/`);
  };

  const goToLessonPage = (id: string | undefined) => {
    if (id) {
      navigate(`lesson/${id}`);
    }
  };

  if (classroom) {
    return (
      <div></div>
    );
  } else {
    return <div />;
  }
};

export default StudentClassroom;
