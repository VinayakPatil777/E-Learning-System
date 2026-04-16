import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllCoursesApi,
  getMyCoursesApi,
  createOrderApi,
  verifyPaymentApi,
  getNotEnrolledCoursesApi
} from "../../services/studentApi";

import LogoutButton from "../../components/common/LogoutButton";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const studentName = localStorage.getItem("studentName") || "Student";

  useEffect(() => {
    loadCourses();
  }, []);

  /* ================= LOAD COURSES ================= */
  const loadCourses = async () => {
    try {
      // Fetch both All Courses and My Courses to perform client-side filtering
      // This ensures we get the full DTO which includes instructorName
      const [allRes, myRes] = await Promise.all([
        getAllCoursesApi(),
        getMyCoursesApi() // We need to filter out already enrolled courses
      ]);

      const allCourses = allRes.data || [];
      const myCourses = myRes.data || [];
      const myCourseIds = new Set(myCourses.map(c => c.courseId));

      const notEnrolled = allCourses.filter(c => !myCourseIds.has(c.courseId));

      setCourses(notEnrolled);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    }
  };

  /* ================= PAY & ENROLL ================= */
  const enrollCourse = async (course) => {
    if (loadingId) return;

    try {
      setLoadingId(course.courseId);

      const res = await createOrderApi(course.courseId);
      const { orderId, amount, currency } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount,
        currency,
        name: "Veda Learning",
        description: course.title,
        order_id: orderId,

        handler: async function (response) {
          try {
            await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            toast.success("🎉 Enrolled successfully!");

            setCourses((prev) =>
              prev.filter((c) => c.courseId !== course.courseId)
            );
          } catch {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => toast.info("Payment cancelled"),
        },

        theme: { color: "#6f42c1" }, // New Purple Theme
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Failed to initiate payment");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container py-5">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <span>&larr;</span> Back
          </button>
          <Link to="/student/profile" className="btn btn-primary">View Profile</Link>
        </div>
        <LogoutButton />
      </div>

      {/* ================= HERO SECTION ================= */}
      {/* ================= HERO SECTION ================= */}
      <div className="card border-0 shadow-lg overflow-hidden mb-5 bg-purple text-white position-relative">
        {/* Background Shapes - Moved before content and set to z-0 */}
        <div className="position-absolute bg-white opacity-10 rounded-circle z-0" style={{ top: '-50px', right: '-50px', width: '300px', height: '300px' }}></div>
        <div className="position-absolute bg-white opacity-05 rounded-circle z-0" style={{ bottom: '-100px', left: '100px', width: '200px', height: '200px' }}></div>

        <div className="card-body p-5 position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-white bg-opacity-25 mb-3 border border-white border-opacity-25">🎓 Student Platform</span>
              <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-2px' }}>Welcome, {studentName}!</h1>
              <p className="lead opacity-90 mb-4 fw-light" style={{ maxWidth: '600px' }}>
                Ready to unlock new skills? Browse our catalog of expert-led courses and start learning today.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-light rounded-pill px-4 text-purple fw-bold shadow-sm" onClick={() => navigate("/student/my-courses")}>
                  ▶ My Learning
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 backdrop-blur" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
                  Browse All
                </button>
              </div>
            </div>
            {/* Decorative Illustration */}
            <div className="col-lg-4 d-none d-lg-block text-center">
              <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg backdrop-blur" style={{ width: '220px', height: '220px' }}>
                <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}>🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COURSES GRID ================= */}
      <h3 className="fw-bold mb-4 text-purple">Explore Courses</h3>

      {courses.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 mb-3">🎉</div>
          <h3 className="text-muted">You have enrolled in all available courses!</h3>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((c, index) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={c.courseId}>
              <div className={`card custom-card h-100 border-0 shadow-sm hover-lift ${loadingId === c.courseId ? "opacity-75" : ""}`}>
                {/* Placeholder Image/Gradient */}
                <div className="card-img-top d-flex align-items-center justify-content-center text-white text-center p-3"
                  style={{
                    height: '160px',
                    background: `linear-gradient(135deg, ${['#a855f7', '#6366f1', '#ec4899'][index % 3]} 0%, ${['#d8b4fe', '#818cf8', '#f9a8d4'][index % 3]} 100%)`
                  }}>
                  <span className="fw-bold fs-4 opacity-75">{c.title}</span>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Course</small>
                    <span className="badge bg-green-light text-success rounded-pill">₹{c.price}</span>
                  </div>

                  <h5 className="card-title fw-bold mb-2 text-dark">{c.title}</h5>
                  <p className="card-text text-muted small mb-2">
                    {c.description ? (c.description.length > 60 ? c.description.substring(0, 60) + "..." : c.description) : "No description available"}
                  </p>
                  {c.instructorName && (
                    <p className="fw-bold text-purple small mb-3 flex-grow-1">
                      By {c.instructorName}
                    </p>
                  )}

                  <hr className="my-3 opacity-10" />

                  <button
                    className="btn btn-purple w-100 rounded-pill shadow-purple"
                    disabled={loadingId === c.courseId}
                    onClick={() => enrollCourse(c)}
                  >
                    {loadingId === c.courseId ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default StudentDashboard;

