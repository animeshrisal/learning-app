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
    navigate(`quiz_list/`);
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
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8000/uploads/${classroom.image}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {classroom.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {classroom.description}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => goToAddLessonPage()}>Add new lesson</Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => goToQuizList()}>Go to quiz</Button>
          </Grid>
          <Grid item xs={12}>
            {!isLoading ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lesson Name</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lessonList.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => goToAddLessonPage("edit", row.id)}
                            color="primary"
                            component="span"
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Skeleton animation="wave" />
            )}
          </Grid>
        </Grid>
        <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
          <Edit />
        </Fab>
        <AddClassroomDialogue
          state="Edit"
          classroomId={classroom.id}
          openModal={openModal}
          addClassroom={editClassroom}
          handleClose={handleClose}
        />
      </Container>
    );
  } else {
    return <CircularProgress />;
  }
};

export default TeacherClass;
