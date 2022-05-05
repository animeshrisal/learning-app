
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Quiz } from "../../models/states/QuizState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addQuiz, retrieveQuizList } from "../../slice/quizSlice";

const stateChip = (state: String): JSX.Element => {
  if (state === 'IN_REVIEW') {
    return <div></div>
  } else {
    return <div></div>
  }
};

const QuizList = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const { classroomId } = useParams();

  const quizList = useSelector((state: RootState) => state.quiz.quizList);

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveQuizList(classroomId));
    }
  }, [dispatch, classroomId]);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(true);
  };

  const handleClose: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setOpenModal(false);
  };
  const createQuiz = (quiz: Quiz) => {
    if (classroomId) {
      dispatch(addQuiz({ classroomId, quiz }));
    }
  };

  const goToQuizPage = (id: string | undefined) => {
    navigate(`${id}`);
  };

  return (
    <React.Fragment>

    </React.Fragment>
  );
};

export default QuizList;
