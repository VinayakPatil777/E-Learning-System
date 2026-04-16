import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-wrapper bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section position-relative overflow-hidden d-flex align-items-center justify-content-center pt-5">
        <div className="container position-relative z-1 text-center py-5">
          <span className="badge bg-purple-light text-purple rounded-pill px-3 py-2 mb-3 fw-semibold">
            🚀 #1 Learning Platform
          </span>
          <h1 className="display-3 fw-bold mb-4 px-lg-5" style={{ letterSpacing: '-1px' }}>
            Unlock Your Potential with <br className="d-none d-lg-block" />
            <span className="text-purple position-relative">
              Expert-Led Courses
              <svg className="position-absolute w-100" style={{ bottom: '-10px', left: 0, height: '10px' }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7951 2.3333 120.306 -3.49997 198 2.00003" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" /></svg>
            </span>
          </h1>

          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Master new skills in programming, design, and more. Join a community of learners and achieve your goals today.
          </p>

          <div className="d-flex justify-content-center gap-3 mb-5">
            <Link to="/student/register" className="btn btn-purple btn-lg rounded-pill px-5 shadow-lg">
              Get Started
            </Link>
            <Link to="/student/login" className="btn btn-outline-purple btn-lg rounded-pill px-5">
              Browse Courses
            </Link>
          </div>

          {/* Floating Cards (Decorative) */}
          {/* Floating Cards (Decorative) */}
          <div className="role-section row justify-content-center g-4 w-100 mx-0 mt-5">
            <div className="col-12 col-md-4">
              <div className="card custom-card h-100 p-4 hover-lift text-center border-0">
                <div className="mb-3 bg-purple-light rounded-circle text-purple d-inline-flex align-items-center justify-content-center mx-auto" style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
                  🎓
                </div>
                <h3 className="h5 fw-bold">For Students</h3>
                <p className="text-muted small mb-3">Learn at your own pace with lifetime access to courses.</p>
                <Link to="/student/register" className="fw-bold text-purple small stretched-link">
                  Join as Student &rarr;
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card custom-card h-100 p-4 hover-lift text-center border-0">
                <div className="mb-3 bg-purple-light rounded-circle text-purple d-inline-flex align-items-center justify-content-center mx-auto" style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
                  👨‍🏫
                </div>
                <h3 className="h5 fw-bold">For Instructors</h3>
                <p className="text-muted small mb-3">Share your knowledge and earn by teaching what you love.</p>
                <Link to="/instructor/register" className="fw-bold text-purple small stretched-link">
                  Teach on Platform &rarr;
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card custom-card h-100 p-4 hover-lift text-center border-0">
                <div className="mb-3 bg-purple-light rounded-circle text-purple d-inline-flex align-items-center justify-content-center mx-auto" style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
                  🛡️
                </div>
                <h3 className="h5 fw-bold">Admin Portal</h3>
                <p className="text-muted small mb-3">Manage functionality, users, and content efficiently.</p>
                <Link to="/admin/login" className="fw-bold text-purple small stretched-link">
                  Admin Login &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Blob */}
        <div className="hero-bg-shape"></div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
