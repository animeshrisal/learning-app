import React from "react";
import { Link } from "react-router-dom";
import "./ClassroomCard.scss";

const ClassroomCard = (props: any): JSX.Element => {
  const goToClassroomPage = () => {
    props.goToClassroomPage(props.id);
  };

  return (
    <div className="card-container">
      <img
        src={`http://127.0.0.1:8000/uploads/${props.image}`}
        alt={props.subject}
      />
      <div className="card-content">
        <h2 className="card-container-subject">{props.subject}</h2>
        <div className="card-container-description">{props.description}</div>
        <div className="card-container-status"> {props.activeStatus}</div>
        <Link className="card-container-link" to={`${props.id}`}>
          Go to class
        </Link>
      </div>
    </div>
  );
};

export default ClassroomCard;
