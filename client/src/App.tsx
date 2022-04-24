import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import TeacherClassList from "./pages/teacher/ClassroomList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/teacher/" element={<TeacherClassList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
