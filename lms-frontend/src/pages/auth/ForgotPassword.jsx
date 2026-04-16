import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../../features/auth/authApi";
import Logo from "../../components/common/Logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await forgotPasswordApi(email);
      toast.success("Password reset link sent to email");
    } catch (err) {
      toast.error(err.response?.data || "Email not registered");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body p-4">
      <div className="w-100" style={{ maxWidth: "450px" }}>

        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/student/login"
            className="d-inline-flex align-items-center text-muted fw-medium hover-lift text-decoration-none"
          >
            <span className="me-2">&larr;</span> Back to Login
          </Link>
        </div>

        {/* Card */}
        <div className="custom-card p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div className="mb-3 d-inline-block">
              <Logo width={48} height={48} />
            </div>
            <h2 className="fw-bold mb-2 text-dark">Forgot Password?</h2>
            <p className="text-muted small">
              Enter your registered email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-uppercase small text-muted">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-purple btn-lg w-100 mb-3 rounded-3 shadow-purple"
              disabled={loading}
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-1">
            Remember your password?{" "}
            <Link to="/student/login" className="fw-bold text-purple text-decoration-none">
              Student Login
            </Link>
          </p>
          <p className="text-muted small">
            Are you an instructor?{" "}
            <Link to="/instructor/login" className="fw-bold text-purple text-decoration-none">
              Instructor Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
