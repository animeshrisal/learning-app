import { Chip, Fab, Grid, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import AddQuizDialogue from "../../components/AddQuizDialogue";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Quiz } from "../../models/states/QuizState";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const stateChip = (state: number): JSX.Element => {
  if (state === 0) {
    return <Chip label="To Review" color="primary" />;
  } else if (state === 1) {
    return <Chip label="Active" color="primary" />;
  } else {
    return <Chip label="Archived" color="primary" />;
  }
};

const QuizList = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const { classroomId } = useParams();

  const quizList = useSelector((state: RootState) => state.quiz.quizList);

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(true);
  };

  const handleClose: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setOpenModal(false);
  };
  const addQuiz = (quiz: Quiz) => {};

  const goToQuizPage = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Quiz</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{stateChip(row.state)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => goToQuizPage(row.id)}
                      sx={{ p: 0 }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddQuizDialogue
          openModal={openModal}
          addQuiz={addQuiz}
          handleClose={handleClose}
          state="Add"
        />
      </Grid>
      <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default QuizList;
