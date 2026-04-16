import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllStudentsApi,
  deleteStudentApi,
} from "../../services/adminApi";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await getAllStudentsApi();
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  // OPEN MODAL
  const handleDeleteClick = (id) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      await deleteStudentApi(studentToDelete);
      toast.success("Student deleted");
      loadStudents();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowModal(false);
      setStudentToDelete(null);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="container py-5 position-relative">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-white border shadow-sm rounded-pill px-4 py-2 fw-bold text-secondary d-flex align-items-center gap-2 hover-scale transition-all"
              onClick={() => window.history.back()}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 0 }}>←</span> Back
            </button>
            <div>
              <h2 className="fw-bold mb-0 text-dark">👨‍🎓 Student Management</h2>
              <p className="text-muted mb-0">Total Students: <span className="fw-bold text-purple">{students.length}</span></p>
            </div>
          </div>
        </div>
        <button className="btn btn-light text-purple fw-bold rounded-pill shadow-sm bg-white border" onClick={loadStudents}>
          🔄 Refresh List
        </button>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <div className="display-1 mb-3">📂</div>
          <p className="text-muted fw-medium">No students found in the system.</p>
        </div>
      ) : (
        <div className="card custom-card border-0 shadow-sm overflow-hidden rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="ps-4 py-4 text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Student Profile</th>
                    <th className="text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Contact Info</th>
                    <th className="text-end pe-4 text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.studentId}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${s.name || s.email}&background=random&color=fff&bold=true`}
                            alt="avatar"
                            className="rounded-circle me-3 shadow-sm"
                            style={{ width: '45px', height: '45px' }}
                          />
                          <div>
                            <h6 className="fw-bold mb-0 text-dark">{s.name ? s.name : "Student User"}</h6>
                            <small className="text-muted opacity-75">ID: {s.studentId}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center text-muted fw-medium">
                          <span className="me-2 text-purple bg-purple bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>✉️</span>
                          {s.email}
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold hover-scale"
                          onClick={() => handleDeleteClick(s.studentId)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRM MODAL */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeInUp" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="card-body p-4 text-center">
              <div className="bg-danger bg-opacity-10 text-danger rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <span style={{ fontSize: '2.5rem' }}>⚠️</span>
              </div>
              <h4 className="fw-bold mb-2 text-dark">Delete Student?</h4>
              <p className="text-muted mb-4">Are you sure you want to remove this student? This action cannot be undone.</p>

              <div className="d-flex gap-2">
                <button className="btn btn-light flex-grow-1 rounded-pill fw-bold py-2" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger flex-grow-1 rounded-pill fw-bold py-2 shadow-sm" onClick={confirmDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminStudents;
