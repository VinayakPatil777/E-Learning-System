import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyCoursesApi } from "../../services/studentApi";
import { useNavigate } from "react-router-dom";

const StudentMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    try {
      const res = await getMyCoursesApi();
      setCourses(res.data);
    } catch {
      toast.error("Failed to load enrolled courses");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-1 text-purple">📘 My Learning</h1>
          <p className="text-muted mb-0">Track your progress and continue learning.</p>
        </div>
        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => navigate("/student/dashboard")}
        >
          &larr; Browse More
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <div className="mb-3 display-1">📚</div>
          <h3 className="text-muted fw-bold">No enrollments yet</h3>
          <p className="text-muted mb-4">You haven't purchased any courses.</p>
          <button className="btn btn-purple px-4 rounded-pill" onClick={() => navigate('/student/dashboard')}>
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course, index) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={course.courseId}>
              <div className="card custom-card h-100 border-0 shadow-sm hover-lift">
                {/* Decorative Gradient Header */}
                <div className="card-header border-0 text-white d-flex align-items-center justify-content-center"
                  style={{
                    height: '120px',
                    background: `linear-gradient(120deg, ${['#6366f1', '#8b5cf6', '#ec4899'][index % 3]} 0%, ${['#818cf8', '#a78bfa', '#f472b6'][index % 3]} 100%)`
                  }}>
                  <span style={{ fontSize: '3rem' }}>🎓</span>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2 text-dark text-truncate-2">{course.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {course.description ? (course.description.length > 60 ? course.description.substring(0, 60) + "..." : course.description) : "No description available."}
                  </p>

                  <hr className="my-3 opacity-10" />

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-purple shadow-purple rounded-pill"
                      onClick={() => navigate(`/student/course/${course.courseId}/videos`)}
                    >
                      ▶ View Content
                    </button>

                    <button
                      className="btn btn-outline-dark rounded-pill btn-sm"
                      onClick={() => navigate(`/student/course/${course.courseId}/quiz`)}
                    >
                      🧠 Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMyCourses;
