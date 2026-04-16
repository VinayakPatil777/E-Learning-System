import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // ✅ normalize role
    const userRole =
      decoded.role?.replace("ROLE_", "") ||
      localStorage.getItem("role");

    if (userRole !== role) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
