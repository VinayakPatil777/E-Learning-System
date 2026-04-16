import { Link } from 'react-router-dom';
import Logo from "./common/Logo";

const Footer = () => {
  return (
    <footer className="footer bg-white border-top pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Logo width={32} height={32} />
              <h5 className="text-purple fw-bold mb-0">Veda Learning</h5>
            </div>
            <p className="text-muted small">
              Empowering learners worldwide with accessible, high-quality education.
              Join our community and start your journey today.
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Platform</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/about" className="text-decoration-none text-muted hover-purple">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none text-muted hover-purple">Contact</Link></li>
              <li className="mb-2"><Link to="/student/register" className="text-decoration-none text-muted hover-purple">Sign Up</Link></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/help" className="text-decoration-none text-muted hover-purple">Help Center</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-decoration-none text-muted hover-purple">Terms of Service</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-decoration-none text-muted hover-purple">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Stay Updated</h6>
            <form className="d-flex gap-2">
              <input type="email" className="form-control form-control-sm" placeholder="Enter your email" />
              <button className="btn btn-purple btn-sm" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <hr className="my-4 text-muted" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-muted mb-0">© 2026 Veda Learning. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small text-muted mb-0">Designed with ❤️ for learning</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

