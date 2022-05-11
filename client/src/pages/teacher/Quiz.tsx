import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Question } from "../../models/states/QuestionState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import questionSlice, {
  addQuestion,
  retrieveQuestionList,
} from "../../slice/questionSlice";
import {
  retrieveQuiz,
  setQuizAsActive,
  setQuizAsArchived,
} from "../../slice/quizSlice";
import Loader from "../../components/Loader";
import { Button } from "../../components/Button";
import AddQuestionDialogue from "../../components/AddQuestionDialogue";
import Modal from "../../components/Modal";
import "./Quiz.scss";

const SetQuizAsActiveModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsActive = () => {
    props.setQuizAsActive();
  };

  return (
    <Modal
      closeModal={handleClose}
      submitModal={setQuizAsActive}
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      title="Warning"
    >
      <div>
        {" "}
        Are you sure you want to set this quiz as active ? You will be unable to
        later edit it.
      </div>
    </Modal>
  );
};

const SetQuizAsArchivedModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsArchived = () => {
    props.setQuizAsArchived();
  };

  return (
    <Modal
      closeModal={handleClose}
      submitModal={setQuizAsArchived}
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      title="Warning"
    >
      <div>
        {" "}
        Are you sure you want to set this quiz as archived ? If you archived it
        students will no longer be able to participate in the quiz.
      </div>
    </Modal>
  );
};

const QuestionCard = (props: Question) => {
  return (
    <div className="question-card">
      <h1>{props.question}</h1>
      <div>
        <div
          className={
            props.correctChoice === 1
              ? "question-card-item active"
              : "question-card-item"
          }
        >
          1. {props.firstChoice}
        </div>
        <div
          className={
            props.correctChoice === 2
              ? "question-card-item active"
              : "question-card-item"
          }
        >
          2. {props.secondChoice}
        </div>
        <div
          className={
            props.correctChoice === 3
              ? "question-card-item active"
              : "question-card-item"
          }
        >
          3. {props.thirdChoice}
        </div>
        <div
          className={
            props.correctChoice === 4
              ? "question-card-item active"
              : "question-card-item"
          }
        >
          4. {props.fourthChoice}
        </div>
      </div>
    </div>
  );
};

const Quiz = (props: any) => {
  const [state, setState] = useState("");

  const { classroomId, quizId } = useParams();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedState, setSelectedState] = useState("Add");
  const [openQuizActiveModal, setOpenQuizActiveModal] = useState(false);
  const [openQuizArchivedModal, setOpenQuizArchivedModal] = useState(false);

  const quiz = useSelector((state: RootState) =>
    state.quiz.quizList.find((quiz) => quiz.id === quizId)
  );

  const questionList = useSelector(
    (state: RootState) => state.question.questionList
  );

  const isLoading = useSelector((state: RootState) => state.question.isLoading);
  useEffect(() => {
    if (classroomId && quizId) {
      dispatch(retrieveQuiz({ quizId, classroomId }));
      dispatch(retrieveQuestionList({ classroomId, quizId }));
    }
  }, [dispatch, classroomId, quizId]);

  const handleClickOpen = () => {
    setSelectedRow(0);
    setSelectedState("Add");
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSelectedRow = (id: any) => {
    setSelectedRow(id);
    setSelectedState("Edit");
    setOpenModal(true);
  };

  const addQuestionToQuiz = (question: Question) => {
    if (classroomId && quizId) {
      dispatch(addQuestion({ classroomId, quizId, question }));
    }
  };

  const setQuizAsActiveFunction = () => {
    if (classroomId && quizId) {
      dispatch(setQuizAsActive({ classroomId, quizId }));
      handleCloseQuizActiveModal();
    }
  };

  const handleOpenQuizActiveModal = (e: any) => {
    setOpenQuizActiveModal(true);
  };

  const handleCloseQuizActiveModal = () => {
    setOpenQuizActiveModal(false);
  };

  const setQuizAsArchivedFunction = () => {
    if (classroomId && quizId) {
      dispatch(setQuizAsArchived({ classroomId, quizId }));
      handleCloseQuizArchivedModal();
    }
  };

  const handleOpenQuizArchivedModal = (e: any) => {
    setOpenQuizArchivedModal(true);
  };

  const handleCloseQuizArchivedModal = () => {
    setOpenQuizArchivedModal(false);
  };

  if (!isLoading) {
    return (
      <div className="quiz-container">
        {quiz?.state === "IN_REVIEW" && (
          <Button onClick={handleOpenQuizActiveModal} title="Set as active" />
        )}
        {quiz?.state === "ACTIVE" && (
          <Button
            title="Set as archived"
            onClick={handleOpenQuizArchivedModal}
          />
        )}
        {quiz?.state === "ARCHIVED" && <div>Archived </div>}
        <Button onClick={handleClickOpen} title="Add new question" />
        <ul className="question-list">
          {questionList.map((question, index) => (
            <li className="question-list-item" key={question.id}>
              <QuestionCard {...question} />
            </li>
          ))}
        </ul>

        <AddQuestionDialogue
          addQuestionToQuiz={addQuestionToQuiz}
          classroomId={classroomId}
          handleClose={handleClose}
          open={openModal}
          selectedRow={selectedRow}
          state={selectedState}
          quizId={quizId}
        />

        <SetQuizAsActiveModal
          open={openQuizActiveModal}
          handleClose={handleCloseQuizActiveModal}
          setQuizAsActive={setQuizAsActiveFunction}
        />

        <SetQuizAsArchivedModal
          open={openQuizArchivedModal}
          handleClose={handleCloseQuizArchivedModal}
          setQuizAsArchived={setQuizAsArchivedFunction}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Quiz;
