import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      <Navbar />

      {/* HERO SECTION */}
      <div className="container py-5 my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge bg-purple-light text-purple rounded-pill px-3 py-2 mb-3 fw-bold">About Us</span>
            <h1 className="display-4 fw-bold mb-4 text-dark">We Are Democratizing <span className="text-purple">Education</span></h1>
            <p className="lead text-muted mb-4 opacity-75">
              Our mission is to make quality education accessible to everyone, anywhere. We believe in the power of technology to bridge gaps and unlock human potential.
            </p>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center">
                <div className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>🏆</div>
                <div>
                  <h6 className="fw-bold mb-0">Award Winning</h6>
                  <small className="text-muted">Recognized Platform</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-green-light text-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>🌍</div>
                <div>
                  <h6 className="fw-bold mb-0">Global Reach</h6>
                  <small className="text-muted">Students from 100+ countries</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team working"
                className="img-fluid rounded-4 shadow-lg position-relative z-1"
              />
              <div className="position-absolute bg-purple rounded px-4 py-3 text-white shadow-lg" style={{ bottom: '-20px', left: '-20px', zIndex: 2 }}>
                <h2 className="fw-bold mb-0">5+</h2>
                <small className="opacity-75">Years Experience</small>
              </div>
              {/* Decor dots */}
              <div className="position-absolute" style={{ top: '-30px', right: '-30px', zIndex: 0 }}>
                <svg width="100" height="100" fill="none" viewBox="0 0 100 100">
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" className="text-purple opacity-25" fill="currentColor" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#dots)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="bg-light py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <h2 className="fw-bold text-purple display-5">10k+</h2>
              <p className="text-muted fw-medium">Active Students</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold text-purple display-5">500+</h2>
              <p className="text-muted fw-medium">Expert Instructors</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold text-purple display-5">1.2k+</h2>
              <p className="text-muted fw-medium">Quality Courses</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold text-purple display-5">4.8/5</h2>
              <p className="text-muted fw-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION / VALUES */}
      <div className="container py-5 my-5">
        <div className="text-center mb-5 mw-800 mx-auto">
          <span className="text-purple fw-bold text-uppercase small ls-1">Why Choose Us</span>
          <h2 className="fw-bold display-6 mt-2">Reimagining Online Learning</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift text-center">
              <div className="bg-purple-light text-purple rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                🚀
              </div>
              <h4 className="fw-bold">Fast Learning</h4>
              <p className="text-muted opacity-75">Our bite-sized lessons allow you to learn complex topics in record time.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift text-center">
              <div className="bg-purple-light text-purple rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                🤝
              </div>
              <h4 className="fw-bold">Community First</h4>
              <p className="text-muted opacity-75">Join a supportive network of learners and mentors ready to help you succeed.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift text-center">
              <div className="bg-purple-light text-purple rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                🎓
              </div>
              <h4 className="fw-bold">Expert Led</h4>
              <p className="text-muted opacity-75">Learn directly from industry veterans who have been there and done that.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

