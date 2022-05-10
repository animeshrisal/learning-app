import React, { useState } from "react";
import Modal from "./Modal";

const AddQuestionDialogue = (props: any) => {
  const [question, setQuestion] = useState("");
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");
  const [thirdChoice, setThirdChoice] = useState("");
  const [fourthChoice, setFourthChoice] = useState("");
  const [correctChoice, setCorrectChoice] = useState("");

  const handleClose = () => {
    resetForm();
    props.handleClose();
  };

  const addQuestion = () => {
    props.addQuestionToQuiz(
      {
        question,
        firstChoice,
        secondChoice,
        thirdChoice,
        fourthChoice,
        correctChoice,
      },
      props.state
    );
    handleClose();
  };

  const resetForm = () => {
    setQuestion("");
    setFirstChoice("");
    setSecondChoice("");
    setThirdChoice("");
    setFourthChoice("");
    setCorrectChoice("");
  };

  const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.target.value);
  const handleFirstChoice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstChoice(e.target.value);
  const handleSecondChoice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSecondChoice(e.target.value);
  const handleThirdChoice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setThirdChoice(e.target.value);
  const handleFourthChoice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFourthChoice(e.target.value);
  // const handleCorrectChoice = (e: SelectChangeEvent<string>) => setCorrectChoice(e.target.value);

  return (
    <Modal
      title="Add Question"
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      closeModal={handleClose}
      submitModal={addQuestion}
    >
      <div>ASDASD</div>
    </Modal>
  );
};

export default AddQuestionDialogue;
