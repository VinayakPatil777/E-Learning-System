import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { instructorLoginApi } from "../../features/auth/authApi";
import { loginSuccess } from "../../features/auth/authSlice";

import Logo from "../../components/common/Logo";

const InstructorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear any existing authentication data when login page is accessed
  useEffect(() => {
    localStorage.clear(); // Clear all stored data including tokens
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instructorLoginApi({ email, password });
      const decoded = jwtDecode(res.data.token);
      dispatch(
        loginSuccess({
          token: res.data.token,
          user: { id: decoded.id, email: decoded.sub, role: decoded.role },
        })
      );
      toast.success("Instructor login successful");
      navigate("/instructor/dashboard");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* LEFT SIDE: Artwork */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 bg-dark position-relative overflow-hidden">
        <div className="z-1 text-white text-center px-5">
          <h1 className="display-4 fw-bold mb-4">Teach Your Passion</h1>
          <p className="lead opacity-75">Join our platform to share your knowledge and inspire students worldwide.</p>
        </div>
        <div className="position-absolute bg-purple opacity-25 rounded-circle" style={{ width: '600px', height: '600px', top: '-10%', left: '-10%' }}></div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted fw-medium mb-5 hover-lift">
            <span className="me-2">&larr;</span> Back to Home
          </Link>

          <div className="mb-5">
            <div className="mb-3"><Logo width={48} height={48} /></div>
            <h2 className="fw-bold mb-2 text-dark">Instructor Login</h2>
            <p className="text-muted">Access your dashboard to manage courses.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Email Address</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="instructor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-semibold text-uppercase small text-muted mb-0">Password</label>
                <Link to="/forgot-password" className="small text-purple text-decoration-none fw-semibold">Forgot Password?</Link>
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="Enter your password"
                  value={password}
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
              Login
            </button>

            <div className="text-center">
              <span className="text-muted">New Instructor? </span>
              <Link to="/instructor/register" className="fw-bold text-purple text-decoration-none">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
