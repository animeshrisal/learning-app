
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addClassroom,
  retrieveClassroomList,
} from "../../slice/classroomSlice";
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
      {data.classroomList.map(classroom => 
        <div>ASDASD</div>
      )}
    </React.Fragment>
  );
};

export default TeacherClassList;
