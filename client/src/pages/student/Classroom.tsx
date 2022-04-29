import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import ClassroomCard from "../../components/ClassroomCard";
import { Classroom } from "../../models/states/ClassroomState";
import { retrieveStudentLessonList } from "../../slice/lessonSlice";
import { retrieveStudentClassroom } from "../../slice/classroomSlice";
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

  const createEnrollment = () => {};

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
      <Container>
        <Grid container spacing={2}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            {classroom.enrolled ? <Button>Enrolled</Button>:
            <Button onClick={createEnrollment}>Enroll</Button>}
          </Grid>
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
          <Grid item xs={8}>
            {classroom.enrolled ? (
              !isLoading ? (
                lessonList.map((lesson) => (
                  <Accordion key={lesson.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography>{lesson.name}</Typography>
                        </Grid>
                        <Grid item>
                          {lesson.completed ? (
                            <CheckCircleIcon />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )}
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{lesson.description}</Typography>
                      <Button onClick={() => goToLessonPage(lesson.id)}>
                        Go to Lesson
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <CircularProgress />
              )
            ) : (
              <Box>Please enroll in the class to see the lessons</Box>
            )}
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, height: 200 }}>
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                title="Teacher"
                subheader="Toast boi"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.description}
                </Typography>
              </CardContent>
            </Card>
            <Grid>
              <Button onClick={goToUserQuiz}>Take Quiz</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return <CircularProgress />;
  }
};

export default StudentClassroom;
