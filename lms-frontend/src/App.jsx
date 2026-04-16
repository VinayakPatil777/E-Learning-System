import React from "react";
import { Routes, Route } from "react-router-dom";

/* PUBLIC */
import LandingPage from "./pages/public/LandingPage";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import HelpCenter from "./pages/public/HelpCenter";
import TermsOfService from "./pages/public/TermsOfService";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";

/* AUTH */
import StudentLogin from "./pages/auth/StudentLogin";
import StudentRegister from "./pages/auth/StudentRegister";
import InstructorLogin from "./pages/auth/InstructorLogin";
import InstructorRegister from "./pages/auth/InstructorRegister";
import AdminLogin from "./pages/auth/AdminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* STUDENT */
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMyCourses from "./pages/student/StudentMyCourses";
import StudentCourseVideos from "./pages/student/StudentCourseVideos";
import StudentQuiz from "./pages/student/StudentQuiz";
import Profile from "./pages/student/Profile";

/* INSTRUCTOR */
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorCourseVideos from "./pages/instructor/InstructorCourseVideos";
import InstructorQuizManager from "./pages/instructor/InstructorQuizManager";
import InstructorLayout from "./layouts/InstructorLayout";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminInstructors from "./pages/Admin/AdminInstructors";
import AdminLayout from "./layouts/AdminLayout";

import AdminCourses from "./pages/admin/AdminCourses"
import AdminPayments from "./pages/admin/AdminPayments";

/* SECURITY */
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      {/* ================= AUTH ================= */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/instructor/login" element={<InstructorLogin />} />
      <Route path="/instructor/register" element={<InstructorRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= STUDENT ================= */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/my-courses"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentMyCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/videos"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentCourseVideos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/course/:courseId/quiz"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="STUDENT">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= INSTRUCTOR ================= */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute role="INSTRUCTOR">
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="course/:courseId/videos" element={<InstructorCourseVideos />} />
        <Route path="course/:courseId/quiz" element={<InstructorQuizManager />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="instructors" element={<AdminInstructors />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="payments" element={<AdminPayments />} />
      </Route>

    </Routes>
  );
}

export default App;
