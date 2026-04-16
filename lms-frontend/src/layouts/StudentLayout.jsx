import { Outlet, useNavigate, Link } from "react-router-dom";
import "./StudentLayout.css";

const StudentLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-purple" to="/student/dashboard">
            🎓 UdemyClone
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#studentNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="studentNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link fw-medium hover-purple" to="/student/dashboard">Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium hover-purple" to="/student/my-courses">My Learning</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;

