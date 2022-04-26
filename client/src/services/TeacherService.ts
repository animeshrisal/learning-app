import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../helpers";
import { Classroom } from "../models/states/ClassroomState";
import { Lesson } from "../models/states/LessonState";
import { Question } from "../models/states/QuestionState";
import { Quiz } from "../models/states/QuizState";

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
    `${URL}/teacher/classroom/${classroomId}/lesson/create`,
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

const getQuizzes = (classroomId: string): Promise<Quiz[]> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quizzes) => {
      return quizzes;
    });
};

const getQuiz = (classroomId: string, quizId: string): Promise<Quiz> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const getQuestion = (
  classroomId: string,
  quizId: string,
  questionId: string
): Promise<Question> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/question/${questionId}/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const getQuestions = (
  classroomId: string,
  quizId: string
): Promise<Question[]> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/question/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const postQuiz = (classroomId: string, quiz: Quiz): Promise<Quiz> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/create`,
    authenticatedRequestGenerator(quiz, "POST")
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const postQuestion = (
  classroomId: string,
  quizId: string,
  question: Question
): Promise<Question> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/create/`,
    authenticatedRequestGenerator(question, "POST")
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const updateQuestion = (
  classroomId: string,
  quizId: string,
  questionId: string,
  question: Question
): Promise<Question> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/question/${questionId}/`,
    authenticatedRequestGenerator(question, "PUT")
  )
    .then(handleResponse)
    .then((question) => {
      return question;
    });
};

const setQuizAsActive = (
  classroomId: string,
  quizId: string
): Promise<Question> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/active`,
    authenticatedRequestGenerator({}, "PUT")
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

const setQuizAsArchived = (
  classroomId: string,
  quizId: string
): Promise<Quiz> => {
  return fetch(
    `${URL}/teacher/classroom/${classroomId}/quiz/${quizId}/archive`,
    authenticatedRequestGenerator({}, "PUT")
  )
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
};

export const teacherDashboardService = {
  deleteClassroom,
  deleteLesson,
  getClassroom,
  getClassrooms,
  getLesson,
  getLessons,
  getQuestion,
  getQuestions,
  getQuiz,
  getQuizzes,
  postClassroom,
  postLesson,
  postQuestion,
  postQuiz,
  setQuizAsActive,
  setQuizAsArchived,
  updateClassroom,
  updateLesson,
  updateQuestion,
};
