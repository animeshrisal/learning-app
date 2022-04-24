import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Classroom } from "../models/states/ClassroomState";

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
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const handleActiveStatus = (e: React.ChangeEvent<HTMLInputElement>) =>
    setActiveStatus(e.target.checked);

  return (
    <Dialog open={props.openModal} onClose={handleClose}>
      <DialogTitle>{props.state} Classroom</DialogTitle>
      <DialogContent>
        <Switch
          checked={activeStatus}
          onChange={handleActiveStatus}
          inputProps={{ "aria-label": "controlled" }}
        />
        <TextField
          margin="normal"
          value={subject}
          onChange={handleSubject}
          required
          fullWidth
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          autoFocus
        />
        <TextField
          margin="normal"
          value={description}
          onChange={handleDescription}
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
        />
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={handleImage}
        />
        <label htmlFor="select-image">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        {imageUrl && (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={imageUrl} alt={"asd"} height="100px" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addClassroom}>Add Classroom</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClassroomDialogue;
