import { Link } from 'react-router-dom';
import Logo from "./Logo";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-purple fs-4 d-flex align-items-center gap-2" to="/">
                    <Logo width={32} height={32} />
                    Veda Learning
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link to="/student/login" className="btn btn-outline-purple px-4 rounded-pill me-2">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student/register" className="btn btn-purple px-4 rounded-pill">
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
