import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/user/Home';
import CoursesList from './pages/user/CourseList';
import CourseDetails from './pages/user/CourseDetails';
import MyEnrollments from './pages/user/MyEnrollment';
import Player from './pages/user/Player';
import Loading from './components/user/Loading';
import Educator from './pages/admin/Educator';
import Dashboard from './pages/admin/Dashboard';
import AddCourse from './pages/admin/AddCourse';
import MyCourses from './pages/admin/MyCourses';
import StudentEntrolled from './pages/admin/StudentEnrolled';
import Navbar from './components/user/Navbar'
import './App.css';

function App() {

  const isEducatorRoute=useMatch('/educator')
  return (
    <div className='text-default min-h-screen bg-white'>
   {!isEducatorRoute &&<Navbar />}   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />} />
        <Route path="/educator/dashboard" element={<Dashboard />} />
        <Route path="/educator/add-course" element={<AddCourse />} />
        <Route path="/educator/my-courses" element={<MyCourses />} />
        <Route path="/educator/student-enrolled" element={<StudentEntrolled />} />
      </Routes>
    </div>
  );
}

export default App;