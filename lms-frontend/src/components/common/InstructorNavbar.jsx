import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const InstructorNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/instructor/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-purple fs-4" to="/instructor/dashboard">
                    <span role="img" aria-label="instructor">👨‍🏫</span> Instructor Portal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#instructorNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="instructorNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link fw-medium ${isActive ? 'text-purple fw-bold' : ''}`}
                                to="/instructor/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link fw-medium ${isActive ? 'text-purple fw-bold' : ''}`}
                                to="/instructor/courses"
                            >
                                My Courses
                            </NavLink>
                        </li>
                        <li className="nav-item ps-lg-3">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger btn-sm rounded-pill px-4 fw-medium"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default InstructorNavbar;
