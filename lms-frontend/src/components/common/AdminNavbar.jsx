import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "bg-purple text-white" : "text-dark hover-bg-light";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
            <div className="container">
                {/* BRAND */}
                <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-purple fs-4" to="/admin/dashboard">
                    <span className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        🛡️
                    </span>
                    LMS Admin
                </Link>

                {/* TOGGLE BTN */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* LINKS */}
                <div className="collapse navbar-collapse" id="adminNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
                        <li className="nav-item">
                            <Link className={`nav-link px-3 rounded-pill fw-medium ${isActive("/admin/dashboard")}`} to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 rounded-pill fw-medium ${isActive("/admin/students")}`} to="/admin/students">
                                Students
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 rounded-pill fw-medium ${isActive("/admin/instructors")}`} to="/admin/instructors">
                                Instructors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 rounded-pill fw-medium ${isActive("/admin/courses")}`} to="/admin/courses">
                                Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 rounded-pill fw-medium ${isActive("/admin/payments")}`} to="/admin/payments">
                                Payments
                            </Link>
                        </li>

                        <li className="nav-item ms-lg-3">
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
