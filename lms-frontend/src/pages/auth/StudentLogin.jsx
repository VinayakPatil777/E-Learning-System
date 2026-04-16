import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

import Logo from "../../components/common/Logo";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Clear any existing authentication data when login page is accessed
  useEffect(() => {
    localStorage.clear(); // Clear all stored data including tokens
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }
    try {
      const res = await api.post("/auth/student/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "STUDENT");
      toast.success("Login successful");
      navigate("/student/dashboard");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* LEFT SIDE: Artwork/Banner */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 bg-purple position-relative overflow-hidden">
        <div className="z-1 text-white text-center px-5">
          <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
          <p className="lead opacity-75">Connect with the best courses and instructors to upgrade your skills.</p>
        </div>

        {/* Decorative Shapes */}
        <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}></div>
        <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', bottom: '-50px', right: '-50px' }}></div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted fw-medium mb-5 hover-lift">
            <span className="me-2">&larr;</span> Back to Home
          </Link>

          <div className="mb-5">
            <div className="mb-3"><Logo width={48} height={48} /></div>
            <h2 className="fw-bold mb-2 text-dark">Student Login</h2>
            <p className="text-muted">Enter your details to access your account</p>
          </div>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                />
                <button
                  className="btn bg-light border-0 text-muted"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-purple btn-lg w-100 mb-4 rounded-3 shadow-purple">
              Sign In
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/student/register" className="fw-bold text-purple text-decoration-none">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
