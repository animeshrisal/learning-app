import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RootState } from "../app/store";
import { Lesson } from "../models/states/LessonState";
import { addLesson, retrieveLesson, updateLesson } from "../slice/lessonSlice";

const LessonCard = (props: any) => {
  const { action, id } = props;
  const { register, handleSubmit } = useForm();
  const [body, setBody] = useState<string>("");

  const dispatch = useDispatch();

  const lesson = useSelector((reduxState: RootState) =>
    reduxState.lesson.lessonList.find((lesson: Lesson) => lesson.id === id)
  );

  const { classroomId } = useParams();

  useEffect(() => {
    if (action === "edit" && lesson && classroomId) {
      dispatch(retrieveLesson({ classroomId, lessonId: lesson.id }));
    }
  }, [dispatch, action, lesson, classroomId]);

  const createLesson = (data: any) => {
    if (classroomId) {
      const lesson: Lesson = { ...data, body };
      dispatch(
        action === "edit"
          ? updateLesson({ classroomId, lesson, lessonId: lesson.id })
          : addLesson({ classroomId, lesson })
      );
    }
  };

  const handleBody = (e: any) => {
    setBody(e);
  };

  return (
    <Box>
      <Heading>{action === "edit" ? "Edit" : "Add"} lesson</Heading>
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

export default LessonCard;
