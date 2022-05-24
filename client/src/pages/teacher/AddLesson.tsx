import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLesson, retrieveLesson } from "../../slice/lessonSlice";
import { Lesson } from "../../models/states/LessonState";
import { RootState } from "../../app/store";

import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const AddLessonPage = (props: any) => {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  const { state }: { state: any } = useLocation();
  const [body, setBody] = useState<string>("");

  const dispatch = useDispatch();

  const lesson = useSelector((reduxState: RootState) =>
    reduxState.lesson.lessonList.find(
      (lesson: Lesson) => lesson.id === state.id
    )
  );

  const { classroomId } = useParams();

  useEffect(() => {
    if (state.action === "edit" && lesson && classroomId) {
      dispatch(retrieveLesson({ classroomId, lessonId: lesson.id }));
    }
  }, [dispatch, state.action, lesson, classroomId]);

  const createLesson = (data: any) => {
    if (classroomId) {
      const lesson: Lesson = { ...data, body };
      dispatch(addLesson({ classroomId, lesson }));
    }
  };

  const handleBody = (e: any) => {
    setBody(e);
  };

  return (
    <Box>
      <Heading>{state === "edit" ? "Edit" : "Add"} lesson</Heading>
      <form>
        <Stack
          spacing={4}
          p="1rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
        >
          <FormControl>
            <Input
              {...register("name")}
              placeholder="Name"
              id="name"
              type="text"
            />
            <Input
              {...register("description")}
              placeholder="Description"
              id="description"
              type="text"
            />
          </FormControl>

          <Box>
            <MDEditor value={body} onChange={handleBody} />
            <span>*Right side will show you the preview</span>
          </Box>
          <Button onClick={handleSubmit(createLesson)}>Create </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddLessonPage;
