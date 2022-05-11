import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Modal from "./Modal";
import "./AddClassroomDialogue.scss";

const AddClassroomDialogue = (props: any): JSX.Element => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState("");

  const classroom = useSelector((state: RootState) =>
    state.classroom.classroomList.find(
      (classroom) => classroom.id === props.classroomId
    )
  );

  useEffect(() => {
    if (props.state === "Edit" && classroom) {
      setSubject(classroom.subject);
      setDescription(classroom.description);
      setActiveStatus(classroom.activeStatus);
      setImageUrl(`http://localhost:8000/uploads/${classroom.image}`);
    }
  }, [props.state, classroom]);

  const handleClose = () => {
    props.handleClose();
  };

  const addClassroom = () => {
    props.addClassroom(
      { subject, description, image, activeStatus },
      props.state
    );
    setSubject("");
    setDescription("");
    handleClose();
  };

  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubject(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleActiveStatus = (e: React.ChangeEvent<HTMLInputElement>) =>
    setActiveStatus(e.target.checked);

  return (
    <Modal
      title="Add Classroom"
      submit="Submit"
      cancel="Cancel"
      open={props.open}
      closeModal={handleClose}
      submitModal={addClassroom}
    >
      <div className="form-container">
        <div className="form-input">
          <label htmlFor="html">Subject</label>
          <input onChange={handleSubject} type="text" />
        </div>
        <div className="form-input">
          <label htmlFor="html">Description</label>
          <textarea onChange={handleDescription} />
        </div>
        <div className="form-input">
          <label htmlFor="checkBox">Active</label>
          <input onChange={handleActiveStatus} type="checkbox" />
        </div>

        <div className="form-upload-image">
          <input type="file" onChange={handleImage} />
          {imageUrl && image && (
            <div>
              <div>Image Preview:</div>
              <img src={imageUrl} alt={image.name} height="300px" />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddClassroomDialogue;
