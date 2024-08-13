import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrincipalPage from './pages/PrincipalPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthContext } from './context/AuthContext';
import ClassroomForm from './components/ClassroomForm';
import CreateTeacher from './components/CreateTeacher';
import CreateStudent from './components/CreateStudent';
import AssignTeacher from './components/AssignTeacher';
import AssignStudents from './components/AssignStudents';
import CreateTimetable from './components/Timetable';
import ViewTimetable from './components/ViewTimetable';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import EditTeacher from './components/EditTeacher';
import DeleteTeacher from './components/DeleteTeacher';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {user ? (
        <div className="flex">
          <Sidebar role={user.role} />
          <div className="flex-1">
            <Navbar role={user.role} />
            <div className="p-4">
              <Routes>
                <Route path="/principal" element={<PrincipalPage />} />
                <Route path="/principal/create-classroom" element={<ClassroomForm />} />
                <Route path="/principal/create-teacher" element={<CreateTeacher />} />
                <Route path="/principal/create-student" element={<CreateStudent />} />
                <Route path="/principal/assign-teacher" element={<AssignTeacher />} />
                <Route path="/principal/assign-students" element={<AssignStudents />} />
                <Route path="/teacher" element={<TeacherPage />} />
                <Route path="/teacher/timetable" element={<CreateTimetable />} />
                <Route path="/teacher/view-timetable" element={<ViewTimetable role={user.role} />} />
                <Route path="/principal/view-timetable" element={<ViewTimetable role={user.role}  />} />
                <Route path="/principal/timetable" element={<CreateTimetable />} />

                <Route path="/edit-student" element={<EditStudent />} />
                <Route path="/delete-student" element={<DeleteStudent />} />
                <Route path="/edit-teacher" element={<EditTeacher />} />
                <Route path="/delete-teacher" element={<DeleteTeacher />} />

                <Route path="/student" element={<StudentPage />} />
                <Route path="/student/view-timetable" element={<ViewTimetable role={user.role}/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} exact />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
