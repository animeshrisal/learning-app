import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddQuestionDialogue from "../../components/AddQuestionDialogue";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Question } from "../../models/states/QuestionState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addQuestion, retrieveQuestionList } from "../../slice/questionSlice";
import { retrieveQuiz, setQuizAsActive, setQuizAsArchived } from "../../slice/quizSlice";

const SetQuizAsActiveModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsActive = () => {
    props.setQuizAsActive();
  };

  return (
    <Dialog open={props.openModal} onClose={handleClose}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        Are you sure you want to set this quiz as active ? You will be unable to
        later edit it.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={setQuizAsActive}>Set Active</Button>
      </DialogActions>
    </Dialog>
  );
};

const SetQuizAsArchivedModal = (props: any) => {
  const handleClose = () => {
    props.handleClose();
  };

  const setQuizAsActive = () => {
    props.setQuizAsArchived();
  };

  return (
    <Dialog open={props.openModal} onClose={handleClose}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        Are you sure you want to set this quiz as archived ? If you archived it
        students will no longer be able to participate in the quiz.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={setQuizAsActive}>Set Archived</Button>
      </DialogActions>
    </Dialog>
  );
};

const Row = (props: any) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const editRow = (id: any) => {
    props.selectedRow(id);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.question}</TableCell>
        <TableCell>
          <IconButton onClick={() => editRow(row.id)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Choices</TableCell>
                    <TableCell>Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.firstChoice}</TableCell>
                    <TableCell>
                      {row.correctChoice === 1 ? <CheckIcon /> : <ClearIcon />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{row.secondChoice}</TableCell>
                    <TableCell>
                      {row.correctChoice === 2 ? <CheckIcon /> : <ClearIcon />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{row.thirdChoice}</TableCell>
                    <TableCell>
                      {row.correctChoice === 3 ? <CheckIcon /> : <ClearIcon />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{row.fourthChoice}</TableCell>
                    <TableCell>
                      {row.correctChoice === 4 ? <CheckIcon /> : <ClearIcon />}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Quiz = (props: any) => {
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
    console.log(classroomId, quizId);
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
      handleCloseQuizActiveModal()
    }
  };

  const handleOpenQuizActiveModal = () => {
    setOpenQuizActiveModal(true);
  };

  const handleCloseQuizActiveModal = () => {
    setOpenQuizActiveModal(false);
  };

  const setQuizAsArchivedFunction = () => {
    if (classroomId && quizId) {
      dispatch(setQuizAsArchived({ classroomId, quizId }));
      handleCloseQuizArchivedModal()
    }
  };

  const handleOpenQuizArchivedModal = () => {
    setOpenQuizArchivedModal(true);
  };

  const handleCloseQuizArchivedModal = () => {
    setOpenQuizArchivedModal(false);
  };

  if (!isLoading) {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          {quiz?.state === "IN_REVIEW" && (
            <Button onClick={() => handleOpenQuizActiveModal()}>
              Set as active
            </Button>
          )}
          {quiz?.state === "ACTIVE" && (
            <Button onClick={() => handleOpenQuizArchivedModal()}>
              Archive Quiz
            </Button>
          )}
          {quiz?.state === "ARCHIVED" && <div>Archived </div>}
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Question</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionList.map((row) => (
                <Row key={row.id} row={row} selectedRow={handleSelectedRow} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddQuestionDialogue
          openModal={openModal}
          addQuestionToQuiz={addQuestionToQuiz}
          handleClose={handleClose}
          state={selectedState}
          classroomId={classroomId}
          quizId={quizId}
          selectedRow={selectedRow}
        />

        <SetQuizAsActiveModal
          openModal={openQuizActiveModal}
          handleClose={handleCloseQuizActiveModal}
          setQuizAsActive={setQuizAsActiveFunction}
        />

        <SetQuizAsArchivedModal
          openModal={openQuizArchivedModal}
          handleClose={handleCloseQuizArchivedModal}
          setQuizAsArchived={setQuizAsArchivedFunction}
        />

        <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  } else {
    return <CircularProgress />;
  }
};

export default Quiz;
