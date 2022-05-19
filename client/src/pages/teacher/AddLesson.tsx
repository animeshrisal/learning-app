import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "../../slice/lessonSlice";
import { Lesson } from "../../models/states/LessonState";
import { RootState } from "../../app/store";

import { Button } from "@chakra-ui/react";

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
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleBody = (e: any) => {
    setBody(e);
  };

  const createLesson = (e: any) => {
    e.preventDefault();
    if (classroomId) {
      const lesson: Lesson = { name, body, description };
      dispatch(addLesson({ classroomId, lesson }));
    }
  };

  return (
    <div className="add-lesson-container">
      <h1>Add new lesson</h1>
      <form className="lesson-form">
        <div className="lesson-form-input-group">
          <label>Lesson Name:</label>
          <input onChange={handleName} type="text" />
        </div>
        <div className="lesson-form-input-group">
          <label>Description:</label>
          <textarea onChange={handleDescription} />
        </div>
        <div className="lesson-form-md-editor">
          <MDEditor value={body} onChange={handleBody} />
          <span>*Right side will show you the preview</span>
        </div>
        <Button onClick={createLesson}>Create </Button>
      </form>
    </div>
  );
};

export default AddLessonPage;
