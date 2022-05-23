import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const AddClassroomDialogue = (props: any): JSX.Element => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { isSubmitting } = formState;

  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");

  const classroom = useSelector((state: RootState) =>
    state.classroom.classroomList.find(
      (classroom) => classroom.id === props.classroomId
    )
  );

  watch((value, { name, type }) => {
    if (name === "image") {
      setImage(value.image[0]);
      setImageUrl(URL.createObjectURL(value.image[0]));
    }
  });

  useEffect(() => {
    if (props.state === "Edit" && classroom) {
      setImageUrl(`http://localhost:8000/uploads/${classroom.image}`);
    }
  }, [props.state, classroom]);

  const handleClose = () => {
    props.handleClose();
  };

  const addClassroom = (data: any) => {
    const { subject, description, image } = data;
    props.addClassroom({ subject, description, image: image[0] });
    handleClose();
  };

  return (
    <Modal isOpen={props.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Classroom</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <Input
                    {...register("subject")}
                    placeholder="Subject"
                    id="subject"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <Textarea
                    {...register("description")}
                    placeholder="Description"
                    id="description"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...register("image")}
                    placeholder="Image"
                    id="image"
                    type="file"
                  />
                </FormControl>
                {image && imageUrl && <Image src={imageUrl} />}
              </Stack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit(addClassroom)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddClassroomDialogue;
