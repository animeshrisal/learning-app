import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../helpers";
import { Classroom } from "../models/states/ClassroomState";
import { Lesson } from "../models/states/LessonState";

const getClassrooms = (): Promise<Classroom[]> => {
  return fetch(`${URL}/teacher/classroom/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const getClassroom = (id: string): Promise<Classroom> => {
  return fetch(
    `${URL}/teacher/classroom/${id}/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const postClassroom = (classroom: Classroom): Promise<Classroom> => {
  return fetch(
    `${URL}/teacher/classroom/create`,
    authenticatedRequestGenerator(classroom, "POST")
  )
    .then(handleResponse)
    .then((classroom: Classroom) => {
      return classroom;
    });
};

const updateClassroom = (
  classroom: any,
  classroomId: string
): Promise<Classroom> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/update`,
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

const getLessons = (classroomId: string): Promise<Lesson[]> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/lesson`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const getLesson = (classroomId: string, lessonId: string): Promise<Lesson> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/lesson/${lessonId}`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const postLesson = (classroomId: string, lesson: Lesson): Promise<Lesson> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/lesson`,
    authenticatedRequestGenerator(lesson, "POST")
  )
    .then(handleResponse)
    .then((lesson) => {
      return lesson;
    });
};

const updateLesson = (
  classroomId: string,
  lessonId: string,
  lesson: Lesson
): Promise<Lesson> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/lesson/${lessonId}`,
    authenticatedRequestGenerator(lesson, "PUT")
  )
    .then(handleResponse)
    .then((lesson) => {
      return lesson;
    });
};

const deleteLesson = (
  classroomId: string,
  lessonId: string
): Promise<string> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/lesson/${lessonId}`,
    authenticatedRequestGenerator({}, "DELETE")
  )
    .then(handleResponse)
    .then(() => {
      return lessonId;
    });
};

export const teacherDashboardService = {
  getClassroom,
  getClassrooms,
  postClassroom,
  updateClassroom,
  deleteClassroom,
  getLessons,
  getLesson,
  postLesson,
  updateLesson,
  deleteLesson,
};
