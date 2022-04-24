import { Fab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddClassroomDialogue from "../../components/AddClassroomDialogue";
import ClassroomCard from "../../components/ClassroomCard";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addClassroom, retrieveClassroomList } from "../../slice/classroomSlice";
import { Classroom } from "../../models/states/ClassroomState";

const TeacherClassList = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.classroom);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveClassroomList());
  }, [dispatch]);

  const handleClickOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(true);
  };

  const handleClose: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setOpenModal(false);
  };

  const addNewClassroom = (classroom: Classroom) => {
    console.log(classroom)
    dispatch(addClassroom(classroom));
  };

  const goToClassroomPage = (id: any) => {
    navigate(`${id}`);
  };

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {data.classroomList.map((classroom) => (
          <Grid key={classroom.id} item xs={4}>
            <ClassroomCard
              key={classroom.id}
              {...classroom}
              goToClassroomPage={goToClassroomPage}
            />
          </Grid>
        ))}
        <AddClassroomDialogue
          openModal={openModal}
          addClassroom={addNewClassroom}
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

export default TeacherClassList;
