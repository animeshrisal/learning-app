import {
  Button,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Fab,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import { retrieveClassroom, updateClassroom } from "../../slice/classroomSlice";
import { useDispatch, useSelector } from "react-redux";
import { Classroom } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";
import AddClassroomDialogue from "../../components/AddClassroomDialogue";
import Edit from "@mui/icons-material/Edit";
import { retrieveLessonList } from "../../slice/lessonSlice";

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

  const goToAddLessonPage = (action = "post", id: String | undefined = "") => {
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
      <div>

      </div>
    );
  } else {
    return (
      <div>
        
      </div>
    );
  }
};

export default TeacherClass;
