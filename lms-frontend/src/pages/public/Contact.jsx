import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";

const Contact = () => {
  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 my-5">
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden align-items-stretch">

          {/* LEFT SIDE - CONTACT INFO */}
          <div className="col-lg-5 bg-purple text-white p-5 d-flex flex-column justify-content-center position-relative overflow-hidden">
            <div className="position-relative z-1">
              <h2 className="fw-bold display-6 mb-4">Get in Touch</h2>
              <p className="mb-5 opacity-75">We'd love to hear from you. Our friendly team is always here to chat.</p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  📧
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Chat with us</h6>
                  <small className="opacity-75">support@vedalearning.com</small>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  📍
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Visit us</h6>
                  <small className="opacity-75">123 Education St, Knowledge City</small>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  📞
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Call us</h6>
                  <small className="opacity-75">+91 98765 43210</small>
                </div>
              </div>
            </div>

            {/* Decor Shapes */}
            <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', bottom: '-100px', right: '-100px' }}></div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="col-lg-7 bg-white p-5">
            <h3 className="fw-bold text-dark mb-4">Send us a message</h3>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted text-uppercase">First Name</label>
                    <input type="text" className="form-control bg-light border-0 py-3" placeholder="John" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted text-uppercase">Last Name</label>
                    <input type="text" className="form-control bg-light border-0 py-3" placeholder="Doe" />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted text-uppercase">Email Address</label>
                <input type="email" className="form-control bg-light border-0 py-3" placeholder="name@example.com" />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase">Message</label>
                <textarea className="form-control bg-light border-0 py-3" rows="4" placeholder="Tell us how we can help..."></textarea>
              </div>

              <div className="d-grid">
                <button type="button" className="btn btn-purple btn-lg rounded-pill shadow-purple">
                  Send Message &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

