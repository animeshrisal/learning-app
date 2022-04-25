import { ThemeProvider } from "@emotion/react";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { Theme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "../../slice/lessonSlice";
import { Lesson } from "../../models/states/LessonState";
import { RootState } from "../../app/store";

const theme: Theme = createTheme();

const AddLessonPage = (props: any) => {
  const { state }: { state: any } = useLocation();

  const dispatch = useDispatch();

  const lesson = useSelector((reduxState: RootState) =>
    reduxState.lesson.lessonList.find(
      (lesson: Lesson) => lesson.id === state.id
    )
  );

  const { classroomId } = useParams();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    console.log(lesson);
    if (state.action === "edit" && lesson) {
      setName(lesson.name);
      setDescription(lesson.description);
      setBody(lesson.body);
    }
  }, [state.action, lesson]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const handleBody = (e: any) => {
    setBody(e);
  };

  const createLesson = () => {
    if (classroomId) {
      const lesson: Lesson = { name, body, description };
      dispatch(addLesson({ classroomId, lesson }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            New Lesson
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="normal"
            value={name}
            onChange={handleName}
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="description"
            id="description"
            value={description}
            onChange={handleDescription}
            autoComplete="description"
          />
        </Grid>
        <Grid item xs={12}>
          Body
          <MDEditor value={body} onChange={handleBody} />
        </Grid>
        <Button onClick={createLesson}>Add lesson</Button>
      </Grid>
    </ThemeProvider>
  );
};

export default AddLessonPage;
