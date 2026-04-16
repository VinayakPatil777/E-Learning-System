import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import {
  createCourseApi,
  getInstructorCoursesApi,
} from "../../features/instructor/instructorApi";
import { toast } from "react-toastify";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const loadCourses = async () => {
    try {
      const res = await getInstructorCoursesApi();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await createCourseApi(form);
      toast.success("Course created successfully!");
      setForm({ title: "", description: "", price: "" });
      loadCourses();
    } catch {
      toast.error("Failed to create course");
    }
  };

  return (
    <div className="container py-5">
      {/* HERO SECTION - With Gradient/Image Vibe */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card custom-card border-0 overflow-hidden shadow-lg">
            <div className="card-body p-5 text-white d-flex align-items-center justify-content-between position-relative"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              }}>
              <div className="z-1 position-relative">
                <span className="badge bg-white bg-opacity-25 text-white mb-3">Instructor Portal</span>
                <h1 className="fw-bold display-5 mb-2">Welcome Back, {user?.name || "Instructor"}!</h1>
                <p className="lead opacity-90 mb-0">You have <strong>{courses.length} active courses</strong>. Ready to create the next bestseller?</p>
              </div>
              {/* Decorative Pattern using CSS */}
              <div className="position-absolute" style={{ right: '-50px', bottom: '-100px', opacity: 0.1 }}>
                <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,71.2,34.8C60.2,46.7,49.7,56.9,37.6,63.4C25.5,69.9,11.8,72.7,-1.2,74.8C-14.2,76.9,-27.1,78.3,-38.5,72.8C-49.9,67.3,-59.8,55,-68.2,42.1C-76.6,29.2,-83.5,15.7,-82.9,2.4C-82.3,-10.8,-74.3,-23.8,-64.5,-34.4C-54.7,-45,-43.1,-53.2,-31,-61.8C-18.9,-70.4,-6.3,-79.4,3.7,-85.8C13.7,-92.2 30.5,-96 44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* LEFT: Create Course Form */}
        <div className="col-lg-8">
          <h4 className="fw-bold text-dark mb-4 d-flex align-items-center">
            <span className="bg-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px', fontSize: '14px' }}>+</span>
            Create New Course
          </h4>

          <div className="card custom-card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <form onSubmit={handleCreateCourse}>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">Course Title</label>
                  <input
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="e.g. Master Full-Stack Development"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted">Course Description</label>
                  <textarea
                    className="form-control bg-light border-0"
                    rows="5"
                    placeholder="Describe what students will learn..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Price (INR)</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-white shadow-none fw-bold">₹</span>
                      <input
                        type="number"
                        className="form-control form-control-lg bg-light border-0 rounded-end"
                        placeholder="999"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button className="btn btn-purple btn-lg px-5 rounded-pill shadow-purple">
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Stats / Illustrations */}
        <div className="col-lg-4">
          <h4 className="fw-bold text-dark mb-4">Quick Stats</h4>
          <div className="d-flex flex-column gap-3">
            <div className="card custom-card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 text-success">
                📚
              </div>
              <div>
                <h5 className="fw-bold mb-0">{courses.length}</h5>
                <small className="text-muted">Total Courses</small>
              </div>
            </div>

            <div className="card custom-card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 text-info">
                ✅
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-success">Active</h5>
                <small className="text-muted">Instructor Status</small>
              </div>
            </div>

            {/* Visual call to action */}
            <div className="card border-0 mt-4 bg-transparent">
              <div className="card-body text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7466/7466443.png"
                  alt="Teaching"
                  className="img-fluid opacity-75 mb-3"
                  style={{ maxWidth: '180px' }}
                />
                <p className="small text-muted">
                  "Teaching is the highest form of understanding."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;

