import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">

      {/* HERO SECTION */}
      <div className="card custom-card border-0 shadow-lg overflow-hidden mb-5">
        <div className="card-body p-5 text-white position-relative" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
          <div className="position-relative z-1 d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-white bg-opacity-10 mb-2 border border-white border-opacity-25">Admin Portal</span>
              <h1 className="display-5 fw-bold mb-3">System Overview</h1>
              <p className="lead opacity-75 mb-0" style={{ maxWidth: '600px' }}>Manage users, courses, and platform settings from one central control panel.</p>
            </div>
            <div className="d-none d-lg-block">
              <div className="bg-white bg-opacity-10 rounded-circle p-4 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                <span style={{ fontSize: '3rem' }}>🛡️</span>
              </div>
            </div>
          </div>
          {/* Background Texture */}
          <div className="position-absolute" style={{ top: 0, right: 0, bottom: 0, left: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
      </div>


      {/* DASHBOARD GRID */}
      <div className="row g-4">

        {/* STUDENTS */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card custom-card h-100 border-0 shadow-sm p-4 text-center hover-lift transition-all">
            <div className="mb-4 position-relative mx-auto" style={{ width: '100px', height: '100px' }}>
              <div className="position-absolute bg-purple bg-opacity-10 rounded-circle w-100 h-100 top-0 start-0 scale-up-anim"></div>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png" alt="Students" className="img-fluid p-3 position-relative z-1" />
            </div>

            <h4 className="fw-bold text-dark">Students</h4>
            <p className="text-muted small mb-4">Manage student accounts and enrollments.</p>

            <button
              className="btn btn-outline-purple rounded-pill w-100 fw-bold"
              onClick={() => navigate("/admin/students")}
            >
              Manage Students
            </button>
          </div>
        </div>

        {/* INSTRUCTORS */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card custom-card h-100 border-0 shadow-sm p-4 text-center hover-lift transition-all">
            <div className="mb-4 position-relative mx-auto" style={{ width: '100px', height: '100px' }}>
              <div className="position-absolute bg-success bg-opacity-10 rounded-circle w-100 h-100 top-0 start-0 scale-up-anim"></div>
              <img src="https://cdn-icons-png.flaticon.com/512/3429/3429440.png" alt="Instructors" className="img-fluid p-3 position-relative z-1" />
            </div>

            <h4 className="fw-bold text-dark">Instructors</h4>
            <p className="text-muted small mb-4">Verify and manage instructor profiles.</p>

            <button
              className="btn btn-outline-success rounded-pill w-100 fw-bold"
              onClick={() => navigate("/admin/instructors")}
            >
              Manage Instructors
            </button>
          </div>
        </div>

        {/* COURSES */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card custom-card h-100 border-0 shadow-sm p-4 text-center hover-lift transition-all">
            <div className="mb-4 position-relative mx-auto" style={{ width: '100px', height: '100px' }}>
              <div className="position-absolute bg-warning bg-opacity-10 rounded-circle w-100 h-100 top-0 start-0 scale-up-anim"></div>
              <img src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png" alt="Courses" className="img-fluid p-3 position-relative z-1" />
            </div>

            <h4 className="fw-bold text-dark">Courses</h4>
            <p className="text-muted small mb-4">Oversee all platform courses and content.</p>

            <button
              className="btn btn-outline-warning text-dark rounded-pill w-100 fw-bold"
              onClick={() => navigate("/admin/courses")}
            >
              Manage Courses
            </button>
          </div>
        </div>

        {/* PAYMENTS */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card custom-card h-100 border-0 shadow-sm p-4 text-center hover-lift transition-all">
            <div className="mb-4 position-relative mx-auto" style={{ width: '100px', height: '100px' }}>
              <div className="position-absolute bg-danger bg-opacity-10 rounded-circle w-100 h-100 top-0 start-0 scale-up-anim"></div>
              <img src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png" alt="Payments" className="img-fluid p-3 position-relative z-1" />
            </div>

            <h4 className="fw-bold text-dark">Payments</h4>
            <p className="text-muted small mb-4">Track revenue and payment history.</p>

            <button
              className="btn btn-outline-danger rounded-pill w-100 fw-bold"
              onClick={() => navigate("/admin/payments")}
            >
              View Payments
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
