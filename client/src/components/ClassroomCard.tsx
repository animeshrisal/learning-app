import React from "react";

const ClassroomCard = (props: any): JSX.Element => {
  const goToClassroomPage = () => {
    props.goToClassroomPage(props.id);
  };

  return (
    <div>
      {props.id}
      asd
    </div>
  );
};

export default ClassroomCard;
