import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import TeacherClassList from "./pages/teacher/ClassroomList";
import Navbar from "./components/Navbar";
import TeacherClass from "./pages/teacher/Classroom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/teacher/" element={<TeacherClassList />} />
          <Route path="/teacher/:classroomId" element={<TeacherClass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
