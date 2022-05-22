import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../helpers";
import { Classroom } from "../models/states/ClassroomState";
import { Lesson } from "../models/states/LessonState";
import { Quiz } from "../models/states/QuizState";

const getClassrooms = (): Promise<Classroom[]> => {
  return fetch(`${URL}/student/classroom/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classrooms) => {
      return classrooms;
    });
};

const getClassroom = (id: string): Promise<Classroom> => {
  return fetch(
    `${URL}/student/classroom/${id}/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((classroom: Classroom) => {
      return classroom;
    });
};

const getEnrollmentStatus = (id: string): Promise<string> => {
  return fetch(
    `${URL}/student/classroom/${id}/enroll`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((enrollment: string) => {
      return enrollment;
    });
};

const getLessons = (classroomId: string): Promise<Lesson[]> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/lesson`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((lessons:Lesson[]) => {
      return lessons;
    });
};

const getUserLessons = (classroomId: string): Promise<Lesson[]> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/user_lesson`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((lessons: Lesson[]) => {
      return lessons;
    });
};

const getLesson = (classroomId: string, lessonId: string): Promise<Lesson> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/lesson/${lessonId}`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((lesson: Lesson) => {
      return lesson;
    });
};

const createEnrollment = (classroomId: string): Promise<string> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/enroll`,
    authenticatedRequestGenerator({}, "PUT")
  )
    .then(handleResponse)
    .then(() => {
      return classroomId;
    });
};

const completeLesson = (classroomId: string, lessonId: string): Promise<string> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/lesson/${lessonId}/complete`,
    authenticatedRequestGenerator({}, "PUT")
  )
    .then(handleResponse)
    .then((enrollment: string) => {
      return enrollment;
    });
};

const completeQuiz = (classroomId: string, quizId: string, quizState: any): Promise<any> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/quiz/${quizId}/complete`,
    authenticatedRequestGenerator(quizState, "POST")
  )
    .then(handleResponse)
    .then((quizResult: any) => {
      return quizResult;
    });
};

const getQuizzes = (classroomId: string): Promise<Quiz[]> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/student_quiz/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quizzes: Quiz[]) => {
      return quizzes;
    });
};

const getQuestions = (classroomId: string, quizId: string): Promise<Quiz> => {
  return fetch(
    `${URL}/student/classroom/${classroomId}/quiz/${quizId}/question/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quiz: Quiz) => {
      return quiz;
    });
};

export const studentService = {
  createEnrollment,
  completeLesson,
  completeQuiz,
  getClassrooms,
  getClassroom,
  getEnrollmentStatus,
  getLessons,
  getLesson,
  getUserLessons,
  getQuizzes,
  getQuestions,
};
