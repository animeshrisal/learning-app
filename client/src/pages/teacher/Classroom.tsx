import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { retrieveClassroom, updateClassroom } from "../../slice/classroomSlice";
import { useDispatch, useSelector } from "react-redux";
import { Classroom } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";
import AddClassroomDialogue from "../../components/AddClassroomDialogue";
import { retrieveLessonList } from "../../slice/lessonSlice";
import { Button, Spinner } from "@chakra-ui/react";

export type RouteParams = {
  classroomId: string;
};

const TeacherClass = (): JSX.Element => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classroom = useSelector((state: RootState) =>
    state.classroom.classroomList.find(
      (classroom) => classroom.id === classroomId
    )
  );

  const isLoading = useSelector((state: RootState) => state.lesson.isLoading);
  const lessonList = useSelector((state: RootState) => state.lesson.lessonList);

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveClassroom(classroomId));
      dispatch(retrieveLessonList(classroomId));
    }
  }, [classroomId, dispatch]);

  const goToAddLessonPage = (event: any, action: string = "post", id: String = "asd") => {
    navigate(`create/`, { state: { action, id } });
  };

  const goToQuizList = () => {
    navigate(`quizList/`);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(true);
  };

  const handleClose: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setOpenModal(false);
  };

  const editClassroom = (classroom: Classroom) => {
    if (classroomId) {
      dispatch(updateClassroom({ classroom, classroomId }));
    }
  };

  if (classroom) {
    return (
      <div className="classroom-container">
        <div className="classroom-heading">
          <h1 className="classroom-title">{classroom.subject}</h1>
          <div className="classroom-heading-button-group">
            <Button onClick={goToAddLessonPage}> Add new lesson" </Button>
            <Button onClick={goToQuizList} > Quiz List </Button>
          </div>
        </div>
        <div className="classroom-lesson">
          <h2>Lessons</h2>
          {/* <Accordian lesson={lessonList} /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
};

export default TeacherClass;
