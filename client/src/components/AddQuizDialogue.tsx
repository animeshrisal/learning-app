import React, { useState } from "react";
import "./AddQuizDialogue.scss";

const AddQuizDialogue = (props: any) => {
  const [name, setName] = useState<string>("");

  const handleClose = () => {
    props.handleClose();
  };

  const addQuiz = () => {
    props.addQuiz({ name }, props.state);
    setName("");
    handleClose();
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <div>ASD</div>
  );
};

export default AddQuizDialogue;
