
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { Theme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "../../slice/lessonSlice";
import { Lesson } from "../../models/states/LessonState";
import { RootState } from "../../app/store";


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
    <div></div>
  );
};

export default AddLessonPage;
