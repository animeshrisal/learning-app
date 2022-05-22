import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveStudentClassroomList } from "../../slice/classroomSlice";
import { Classroom, ClassroomState } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";
import { ClassroomCard } from "../../components/ClassroomCard";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const StudentClassroomList = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const data: ClassroomState = useSelector(
    (state: RootState) => state.classroom
  );

  useEffect(() => {
    dispatch(retrieveStudentClassroomList());
  }, [dispatch]);

  const navigate = useNavigate();

  const goToClassroomPage = (id: string) => {
    navigate(`${id}`);
  };

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default StudentClassroomList;
