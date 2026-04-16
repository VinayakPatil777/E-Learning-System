import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { instructorRegisterApi } from "../../features/auth/authApi";

const InstructorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instructorRegisterApi({ name, email, password });
      toast.success("Instructor registered successfully");
      navigate("/instructor/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* LEFT SIDE: Artwork */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 bg-dark position-relative overflow-hidden">
        <div className="z-1 text-white text-center px-5">
          <h1 className="display-4 fw-bold mb-4">Empower Others</h1>
          <p className="lead opacity-75">Create comprehensive courses and track student progress with ease.</p>
        </div>
        <div className="position-absolute bg-purple opacity-25 rounded-circle" style={{ width: '600px', height: '600px', bottom: '-10%', right: '-10%' }}></div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted fw-medium mb-5 hover-lift">
            <span className="me-2">&larr;</span> Back to Home
          </Link>

          <div className="mb-5">
            <h2 className="fw-bold mb-2 text-dark">Instructor Registration</h2>
            <p className="text-muted">Create your instructor account below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Full Name</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="Jane Doe"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Email Address</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="instructor@example.com"
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
              <Link to="/instructor/login" className="fw-bold text-purple text-decoration-none">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorRegister;
