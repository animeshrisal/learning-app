import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Quiz } from "../../models/states/QuizState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addQuiz, retrieveQuizList } from "../../slice/quizSlice";

import "./QuizList.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight, faCoffee, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddQuizDialogue from "../../components/AddQuizDialogue";
import { Button } from "@chakra-ui/react";

const StateChip = (props: any): JSX.Element => {
  if (props.state === "IN_REVIEW") {
    return <div>In Review</div>;
  } else if (props.state === "ACTIVE") {
    return <div>Active</div>;
  } else {
    return <div>Archived</div>;
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
    <div className="quiz-list-container">
      <Button onClick={handleClickOpen} title="Add new quiz" />
      <ul className="quiz-list">
        <li className="quiz-list-row">
          <div className="quiz-list-row-name heading">
            <h2>Quizzes</h2>
          </div>
          <div className="quiz-list-row-state heading">
            <h2>State</h2>
          </div>
          <div className="quiz-list-row-action heading">
            <h2>Action</h2>
          </div>
        </li>
        {quizList.map((quiz) => (
          <li className="quiz-list-row" key={quiz.id}>
            <div className="quiz-list-row-name">{quiz.name}</div>
            <div className="quiz-list-row-state">
              <StateChip state={quiz.state} />
            </div>
            <div className="quiz-list-row-action">
              <FontAwesomeIcon
                onClick={() => goToQuizPage(quiz.id)}
                icon={faArrowRight}
              />
            </div>
          </li>
        ))}
      </ul>
      <AddQuizDialogue
        addQuiz={createQuiz}
        open={openModal}
        handleClose={handleClose}
      />
    </div>
  );
};

export default QuizList;
