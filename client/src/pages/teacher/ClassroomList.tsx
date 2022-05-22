import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addClassroom,
  retrieveClassroomList,
} from "../../slice/classroomSlice";
import { Classroom } from "../../models/states/ClassroomState";
import AddClassroomDialogue from "../../components/AddClassroomDialogue";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { ClassroomCard } from "../../components/ClassroomCard";

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
    dispatch(addClassroom(classroom));
  };

  const goToClassroomPage = (id: any) => {
    navigate(`${id}`);
  };

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {data.classroomList.map((classroom) => (
            <GridItem key={classroom.id}>
              <ClassroomCard
                {...classroom}
                handleClassroom={goToClassroomPage}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
      <AddClassroomDialogue
        open={openModal}
        handleClose={handleClose}
        addClassroom={addNewClassroom}
      />
      <Button colorScheme="teal" onClick={handleClickOpen}>
        Add New Classroom
      </Button>
    </>
  );
};

export default TeacherClassList;
