// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import courseService from "../../services/instructorCourseService";
// import "./InstructorCourses.css";

// const InstructorCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ===== EDIT STATE ===== */
//   const [showEdit, setShowEdit] = useState(false);
//   const [editCourse, setEditCourse] = useState({
//     courseId: "",
//     title: "",
//     description: "",
//     price: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   /* ================= LOAD COURSES ================= */
//   const loadCourses = async () => {
//     try {
//       const res = await courseService.getMyCourses();
//       setCourses(res.data);
//     } catch (err) {
//       toast.error("Failed to load courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= DELETE COURSE ================= */
//   const deleteCourse = async (courseId) => {
//     if (!window.confirm("Delete this course?")) return;

//     try {
//       await courseService.deleteCourse(courseId);
//       toast.success("Course deleted");
//       loadCourses();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   /* ================= OPEN EDIT ================= */
//   const openEditModal = (course) => {
//     setEditCourse({
//       courseId: course.courseId,
//       title: course.title,
//       description: course.description,
//       price: course.price,
//     });
//     setShowEdit(true);
//   };

//   /* ================= UPDATE COURSE ================= */
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       await courseService.updateCourse(editCourse.courseId, {
//         title: editCourse.title,
//         description: editCourse.description,
//         price: editCourse.price,
//       });

//       toast.success("Course updated");
//       setShowEdit(false);
//       loadCourses();
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;

//   return (
//     <div className="instructor-courses-page">
//       <h1 className="page-title">📚 My Courses</h1>

//       <div className="course-grid">
//         {courses.map((course) => (
//           <div className="course-card" key={course.courseId}>
//             <h3>{course.title}</h3>
//             <p>{course.description}</p>
//             <p className="price">₹ {course.price}</p>

//             <div className="actions">
//               <button
//                 className="edit"
//                 onClick={() => openEditModal(course)}
//               >
//                 Edit
//               </button>

//               <button
//                 className="delete"
//                 onClick={() => deleteCourse(course.courseId)}
//               >
//                 Delete
//               </button>

//               <button
//                 className="video"
//                 onClick={() =>
//                   navigate(`/instructor/course/${course.courseId}/videos`)
//                 }
//               >
//                 Manage Videos
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= EDIT MODAL ================= */}
//       {showEdit && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit Course</h3>

//             <form onSubmit={handleUpdate}>
//               <input
//                 value={editCourse.title}
//                 onChange={(e) =>
//                   setEditCourse({ ...editCourse, title: e.target.value })
//                 }
//                 placeholder="Title"
//                 required
//               />

//               <textarea
//                 value={editCourse.description}
//                 onChange={(e) =>
//                   setEditCourse({
//                     ...editCourse,
//                     description: e.target.value,
//                   })
//                 }
//                 placeholder="Description"
//                 required
//               />

//               <input
//                 type="number"
//                 value={editCourse.price}
//                 onChange={(e) =>
//                   setEditCourse({ ...editCourse, price: e.target.value })
//                 }
//                 placeholder="Price"
//                 required
//               />

//               <div className="modal-actions">
//                 <button type="submit" className="save">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel"
//                   onClick={() => setShowEdit(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorCourses;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import courseService from "../../services/instructorCourseService";
import "./InstructorCourses.css";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editCourse, setEditCourse] = useState({
    courseId: "",
    title: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await courseService.getMyCourses();
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await courseService.deleteCourse(courseId);
      toast.success("Course deleted");
      loadCourses();
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEditModal = (course) => {
    setEditCourse(course);
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await courseService.updateCourse(editCourse.courseId, {
        title: editCourse.title,
        description: editCourse.description,
        price: editCourse.price,
      });
      toast.success("Course updated");
      setShowEdit(false);
      loadCourses();
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-50">
      <div className="spinner-border text-purple" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0 text-purple">📚 My Courses</h2>
        <span className="badge bg-purple rounded-pill px-3 py-2">{courses.length} Courses</span>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven't created any courses yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={course.courseId}>
              <div className="card custom-card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold mb-0 text-truncate-2 lines">{course.title}</h5>
                    <span className="badge bg-success bg-opacity-10 text-success">₹{course.price}</span>
                  </div>

                  <p className="card-text text-muted small flex-grow-1">
                    {course.description.length > 80 ? course.description.substring(0, 80) + "..." : course.description}
                  </p>

                  <hr className="my-3 opacity-25" />

                  <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => openEditModal(course)}>
                      ✏️ Edit Details
                    </button>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => navigate(`/instructor/course/${course.courseId}/videos`)}>
                      🎬 Videos
                    </button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => navigate(`/instructor/course/${course.courseId}/quiz`)}>
                      🧠 Quiz
                    </button>
                    <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => deleteCourse(course.courseId)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL OVERLAY */}
      {showEdit && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-purple">Edit Course</h5>
                <button type="button" className="btn-close" onClick={() => setShowEdit(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Title</label>
                    <input
                      className="form-control"
                      value={editCourse.title}
                      onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={editCourse.description}
                      onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-medium">Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editCourse.price}
                      onChange={(e) => setEditCourse({ ...editCourse, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-light" onClick={() => setShowEdit(false)}>Cancel</button>
                    <button type="submit" className="btn btn-purple px-4">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;

