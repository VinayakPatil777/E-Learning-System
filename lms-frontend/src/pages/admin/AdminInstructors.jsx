import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllInstructorsApi,
  deleteInstructorApi,
} from "../../services/adminApi";

const AdminInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);

  const loadInstructors = async () => {
    try {
      const res = await getAllInstructorsApi();
      setInstructors(res.data);
    } catch {
      toast.error("Failed to load instructors");
    }
  };

  // OPEN MODAL
  const handleDeleteClick = (id) => {
    setInstructorToDelete(id);
    setShowModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    if (!instructorToDelete) return;

    try {
      await deleteInstructorApi(instructorToDelete);
      toast.success("Instructor deleted");
      loadInstructors();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowModal(false);
      setInstructorToDelete(null);
    }
  };

  useEffect(() => {
    loadInstructors();
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
              <h2 className="fw-bold mb-0 text-dark">👨‍🏫 Instructor Management</h2>
              <p className="text-muted mb-0">Total Instructors: <span className="fw-bold text-purple">{instructors.length}</span></p>
            </div>
          </div>
        </div>
        <button className="btn btn-light text-purple fw-bold rounded-pill shadow-sm" onClick={loadInstructors}>
          🔄 Refresh List
        </button>
      </div>

      {instructors.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <div className="display-1 mb-3">📂</div>
          <p className="text-muted fw-medium">No instructors found in the system.</p>
        </div>
      ) : (
        <div className="card custom-card border-0 shadow-sm overflow-hidden rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="ps-4 py-4 text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Instructor Profile</th>
                    <th className="text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Contact Info</th>
                    <th className="text-end pe-4 text-muted text-uppercase small fw-bold" style={{ letterSpacing: '0.5px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((i) => (
                    <tr key={i.instructorId}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${i.name || i.email}&background=random&color=fff&bold=true`}
                            alt="avatar"
                            className="rounded-circle me-3 shadow-sm"
                            style={{ width: '45px', height: '45px' }}
                          />
                          <div>
                            <h6 className="fw-bold mb-0 text-dark">{i.name ? i.name : "Instructor User"}</h6>
                            <small className="text-muted opacity-75">ID: {i.instructorId}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center text-muted fw-medium">
                          <span className="me-2 text-purple bg-purple bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>✉️</span>
                          {i.email}
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold hover-scale"
                          onClick={() => handleDeleteClick(i.instructorId)}
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
              <h4 className="fw-bold mb-2 text-dark">Delete Instructor?</h4>
              <p className="text-muted mb-4">Are you sure you want to remove this instructor? This action cannot be undone.</p>

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

export default AdminInstructors;
