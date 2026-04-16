import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { adminLoginApi } from "../../features/auth/authApi";
import { loginSuccess } from "../../features/auth/authSlice";

import Logo from "../../components/common/Logo";

const AdminLogin = () => {
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
      const res = await adminLoginApi({ email, password });
      const decoded = jwtDecode(res.data.token);
      dispatch(
        loginSuccess({
          token: res.data.token,
          user: { email: decoded.sub, role: "ADMIN" },
        })
      );
      toast.success("Admin login successful");
      navigate("/admin/dashboard", { replace: true });
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* LEFT SIDE: Artwork */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 bg-gradient-dark position-relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="position-absolute bg-white rounded-pill" style={{ width: '600px', height: '600px', top: '10%', right: '-30%', transform: 'rotate(45deg)', opacity: 0.1, zIndex: 0 }}></div>
        <div className="z-1 text-center px-5 position-relative">
          <h1 className="display-4 fw-bold mb-4 text-white" style={{ color: '#ffffff' }}>Admin Portal</h1>
          <p className="lead opacity-75 text-white" style={{ color: 'rgba(255,255,255,0.8)' }}>Secure access for system administrators.</p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted fw-medium mb-5 hover-lift">
            <span className="me-2">&larr;</span> Back to Home
          </Link>

          <div className="mb-5">
            <div className="mb-3"><Logo width={48} height={48} /></div>
            <h2 className="fw-bold mb-2 text-dark" style={{ color: '#000000' }}>Admin Login</h2>
            <p className="text-muted">Restricted access area.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">Email Address</label>
              <input
                className="form-control form-control-lg bg-light border-0"
                placeholder="admin@example.com"
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
                  placeholder="Enter password"
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

            <button className="btn btn-dark btn-lg w-100 mb-4 rounded-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
