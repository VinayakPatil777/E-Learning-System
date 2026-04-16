import React, { useEffect, useState } from "react";
import { getAllCoursesApi } from "../../services/adminApi";

const AdminCourses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const res = await getAllCoursesApi();
        setCourses(res.data);
    };

    return (
        <div className="container py-5">
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
                            <h2 className="fw-bold mb-0 text-dark">📚 Course Management</h2>
                            <p className="text-muted mb-0">Total Courses: <span className="fw-bold text-purple">{courses.length}</span></p>
                        </div>
                    </div>
                </div>
                <button className="btn btn-light text-purple fw-bold rounded-pill shadow-sm bg-white border" onClick={loadCourses}>
                    🔄 Refresh List
                </button>
            </div>

            <div className="card custom-card border-0 shadow-sm overflow-hidden rounded-4">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light border-bottom">
                                <tr>
                                    <th className="ps-4 py-4 text-muted text-uppercase small fw-bold">ID</th>
                                    <th className="text-muted text-uppercase small fw-bold">Title</th>
                                    <th className="text-muted text-uppercase small fw-bold">Instructor</th>
                                    <th className="text-muted text-uppercase small fw-bold">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((c) => (
                                    <tr key={c.courseId}>
                                        <td className="ps-4 fw-bold text-muted">#{c.courseId}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-warning bg-opacity-10 text-warning rounded p-2 me-3">
                                                    📚
                                                </div>
                                                <span className="fw-bold text-dark">{c.title}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded-circle text-muted d-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                                                    👨‍🏫
                                                </div>
                                                {c.instructorName}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-green-light text-success rounded-pill">₹{c.price}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCourses;