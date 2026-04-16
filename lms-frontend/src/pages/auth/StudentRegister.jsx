import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { studentRegisterApi } from "../../features/auth/authApi";

import Logo from "../../components/common/Logo";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentRegisterApi({ name, email, password });
      toast.success("Student registered successfully");
      navigate("/student/login");
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* LEFT SIDE: Artwork */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 bg-purple position-relative overflow-hidden">
        <div className="z-1 text-white text-center px-5">
          <h1 className="display-4 fw-bold mb-4">Start Learning</h1>
          <p className="lead text-black fw-medium mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>Join thousands of students and start your journey today.</p>
        </div>
        <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '500px', height: '500px', bottom: '-10%', right: '20%' }}></div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted fw-medium mb-5 hover-lift">
            <span className="me-2">&larr;</span> Back to Home
          </Link>

          <div className="mb-5">
            <div className="mb-3"><Logo width={48} height={48} /></div>
            <h2 className="fw-bold mb-2 text-dark">Create Account</h2>
            <p className="text-muted">Fill in your details to register as a student.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Full Name</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Email Address</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn bg-light border-0 text-muted"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button className="btn btn-purple btn-lg w-100 mb-4 rounded-3 shadow-purple">
              Register
            </button>

            <div className="text-center">
              <span className="text-muted">Already have an account? </span>
              <Link to="/student/login" className="fw-bold text-purple text-decoration-none">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
