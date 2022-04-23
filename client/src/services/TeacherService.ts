import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../helpers";
import { Classroom, ClassroomState } from "../models/states/ClassroomState";

const getClassrooms = () => {
  return fetch(`${URL}/teacher/classroom/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const getClassroom = (id: string) => {
  return fetch(
    `${URL}/teacher/classroom/${id}/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const postClassroom = (classroom: any): Promise<Classroom> => {
  return fetch(
    `${URL}/teacher/classroom/`,
    authenticatedRequestGenerator(classroom, "POST")
  )
    .then(handleResponse)
    .then((classroom: Classroom) => {
      return classroom;
    });
};

const updateClassroom = (classroom: any, classroomId: string) => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/`,
    authenticatedRequestGenerator(classroom, "PUT")
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const deleteClassroom = (classroomId: string): Promise<string> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/delete`,
    authenticatedRequestGenerator({}, "DELETE")
  )
    .then(handleResponse)
    .then(() => {
      return classroomId;
    });
};

export const teacherDashboardService = {
  getClassroom,
  getClassrooms,
  postClassroom,
  updateClassroom,
  deleteClassroom
};
