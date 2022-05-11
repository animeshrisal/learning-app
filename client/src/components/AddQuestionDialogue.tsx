import React, { useState } from "react";
import Modal from "./Modal";
import "./AddQuestionDialogue.scss";

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
  const handleCorrectChoice = (e: any) => 
  {
    setCorrectChoice(e.target.value);}

  return (
    <Modal
      title="Add Question"
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      closeModal={handleClose}
      submitModal={addQuestion}
    >
      <form className="add-question-form">
        <div className="form-input">
          <label>Question</label>
          <input onChange={handleQuestion} type="text" />
        </div>
        <div className="form-input">
          <label>Answer 1</label>
          <input onChange={handleFirstChoice} type="text" />
        </div>
        <div className="form-input">
          <label>Answer 2</label>
          <input onChange={handleSecondChoice} type="text" />
        </div>
        <div className="form-input">
          <label>Answer 3</label>
          <input onChange={handleThirdChoice} type="text" />
        </div>
        <div className="form-input">
          <label>Answer 4</label>
          <input onChange={handleFourthChoice}  type="text" />
        </div>
        <h3>Choose the correct option</h3>
        <div onChange={handleCorrectChoice} className="form-input-radio">
          <label>Answer 1</label>
          <input name="correct" type="radio" value={1} />

          <label>Answer 2</label>
          <input name="correct" type="radio" value={2} />

          <label>Answer 3</label>
          <input name="correct" type="radio" value={3} />

          <label>Answer 4</label>
          <input name="correct" type="radio" value={4} />
        </div>
      </form>
    </Modal>
  );
};

export default AddQuestionDialogue;
