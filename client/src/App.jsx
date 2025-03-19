import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { Home,NotFound,Signup } from "../src/pages/index.js"
import { Navbar,Sidebar } from './components/index.js';

const App = () => {
  

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Sidebar/>

      <Routes>
        {/* Common Routes */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />

        {/* User-Specific Routes */}
        <Route path="/profile" element={authUser ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/courses" element={authUser ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/courses/:id" element={authUser ? <CourseDetails /> : <Navigate to="/login" />} />
        <Route path="/courses/enrolled" element={authUser ? <EnrolledCourses /> : <Navigate to="/login" />} />
        <Route path="/courses/:id/reviews" element={authUser ? <SubmitReview /> : <Navigate to="/login" />} />

        {/* Admin-Specific Routes */}
        {authUser && authUser.role === "admin" && (
          <>
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/courses/:id" element={<EditCourse />} />
            <Route path="/admin/courses/:id/enrolled-users" element={<EnrolledUsers />} />
            <Route path="/admin/courses/:id/assignments" element={<ManageAssignments />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
     
    </div>
  );
};

export default App;