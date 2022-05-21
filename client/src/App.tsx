import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import TeacherClassList from "./pages/teacher/ClassroomList";
import TeacherClass from "./pages/teacher/Classroom";
import AddLessonPage from "./pages/teacher/AddLesson";
import QuizList from "./pages/teacher/QuizList";
import Quiz from "./pages/teacher/Quiz";
import StudentClassroomList from "./pages/student/ClassroomList";
import StudentClassroom from "./pages/student/Classroom";
import Register from "./pages/auth/Register";
import StudentLesson from "./pages/student/StudentLesson";
import NavBar from "./components/Header";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box height="100vh" backgroundColor="gray.200">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/auth/register/" element={<Register />} />
          <Route path="/student/" element={<StudentClassroomList />} />
          <Route path="/student/:classroomId" element={<StudentClassroom />} />
          <Route
            path="/student/:classroomId/lesson/:lessonId"
            element={<StudentLesson />}
          />
          <Route path="/teacher/" element={<TeacherClassList />} />
          <Route path="/teacher/:classroomId" element={<TeacherClass />} />
          <Route
            path="/teacher/:classroomId/create"
            element={<AddLessonPage />}
          />
          <Route path="/teacher/:classroomId/quizList" element={<QuizList />} />
          <Route
            path="/teacher/:classroomId/quizList/:quizId"
            element={<Quiz />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
