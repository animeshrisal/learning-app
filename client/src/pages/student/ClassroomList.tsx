import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ClassroomCard from "../../components/ClassroomCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveStudentClassroomList } from "../../slice/classroomSlice";
import { Classroom, ClassroomState } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";

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
    <React.Fragment>
      <Grid container spacing={2}>
        {data.classroomList.map((classroom: Classroom) => (
          <Grid key={classroom.id} item xs={4}>
            <ClassroomCard
              key={classroom.id}
              {...classroom}
              goToClassroomPage={goToClassroomPage}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default StudentClassroomList;