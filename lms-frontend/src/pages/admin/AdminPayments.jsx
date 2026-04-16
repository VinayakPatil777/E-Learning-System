import React, { useEffect, useState } from "react";
import { getAllPaymentsApi } from "../../services/adminApi";

const AdminPayments = () => {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        const res = await getAllPaymentsApi();
        setPayments(res.data);
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
                            <h2 className="fw-bold mb-0 text-dark">💳 Payment History</h2>
                            <p className="text-muted mb-0">Total Transactions: <span className="fw-bold text-purple">{payments.length}</span></p>
                        </div>
                    </div>
                </div>
                <button className="btn btn-light text-purple fw-bold rounded-pill shadow-sm bg-white border" onClick={loadPayments}>
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
                                    <th className="text-muted text-uppercase small fw-bold">Student</th>
                                    <th className="text-muted text-uppercase small fw-bold">Course</th>
                                    <th className="text-muted text-uppercase small fw-bold">Amount</th>
                                    <th className="text-muted text-uppercase small fw-bold">Status</th>
                                    <th className="text-muted text-uppercase small fw-bold">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.paymentId}>
                                        <td className="ps-4 fw-bold text-muted">#{p.paymentId}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-purple bg-opacity-10 text-purple rounded-circle p-1 me-2" style={{ width: '24px', height: '24px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                                                {p.studentName}
                                            </div>
                                        </td>
                                        <td className="text-muted">{p.courseTitle}</td>
                                        <td className="fw-bold text-dark">₹{p.amount}</td>
                                        <td>
                                            <span className={`badge ${p.status === 'captured' ? 'bg-green-light text-success' : 'bg-warning bg-opacity-10 text-warning'} rounded-pill`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="text-muted small">{new Date(p.createdAt).toLocaleString()}</td>
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

export default AdminPayments;