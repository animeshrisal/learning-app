import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveStudentClassroomList } from "../../slice/classroomSlice";
import { Classroom, ClassroomState } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";
import { ClassroomCard } from "../../components/ClassroomCard";

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
    <div className="classroom-list-container">
      <div className="grid-container">
        {data.classroomList.map((classroom) => (
          <ClassroomCard {...classroom} handleClassroom={goToClassroomPage} />
        ))}
      </div>
    </div>
  );
};

export default StudentClassroomList;
