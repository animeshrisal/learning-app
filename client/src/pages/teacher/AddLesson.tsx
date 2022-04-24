import { ThemeProvider } from "@emotion/react";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { Theme } from "@mui/system";
import { useDispatch } from "react-redux";
import { addLesson } from "../../slice/lessonSlice";
import { Lesson } from "../../models/states/LessonState";

const theme: Theme = createTheme();

const AddLessonPage = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();

  const { classroomId } = useParams();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");

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
