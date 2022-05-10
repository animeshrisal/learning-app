import React, { useState } from "react";
import Modal from "./Modal";
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
    <Modal
      title="Add Quiz"
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      closeModal={handleClose}
      submitModal={addQuiz}
    >
      <form className="add-quiz-form">
        <label>Name</label>
        <input onChange={handleName} type="text" />
      </form>
    </Modal>
  );
};

export default AddQuizDialogue;
