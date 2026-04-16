import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";

const HelpCenter = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />

            {/* HERO HERO */}
            <div className="bg-purple text-white py-5 position-relative overflow-hidden">
                <div className="container py-5 text-center position-relative z-1">
                    <h1 className="display-4 fw-bold mb-3">How can we help you?</h1>
                    <p className="lead opacity-75 mb-4">Search our knowledge base or browse topics below</p>
                    <div className="mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="input-group-text bg-white border-0 ps-4 text-muted">🔍</span>
                            <input type="text" className="form-control border-0 py-3" placeholder="Search for answers..." />
                            <button className="btn btn-primary bg-purple-dark border-0 px-4 fw-bold">Search</button>
                        </div>
                    </div>
                </div>
                {/* Background Patterns */}
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
                    <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '80%', height: '200%', background: 'radial-gradient(circle, #fff 0%, transparent 60%)' }}></div>
                </div>
            </div>

            {/* TOPIC CARDS */}
            <div className="container py-5 mt-n5 position-relative z-2">
                <div className="row g-4 justify-content-center">
                    {[
                        { icon: "👨‍🎓", title: "Students", text: "Courses, Quizzes, Progress" },
                        { icon: "👨‍🏫", title: "Instructors", text: "Course Creation, Earnings" },
                        { icon: "💳", title: "Billing", text: "Payments, Refunds, Subs" },
                        { icon: "⚙️", title: "Account", text: "Login, Profile, Security" },
                    ].map((topic, index) => (
                        <div key={index} className="col-md-3 col-6">
                            <div className="card border-0 shadow-sm h-100 text-center py-4 hover-lift">
                                <div className="display-4 mb-3">{topic.icon}</div>
                                <h5 className="fw-bold mb-2">{topic.title}</h5>
                                <p className="small text-muted mb-0">{topic.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="container py-5 mb-5">
                <h3 className="fw-bold text-center mb-5">Frequently Asked Questions</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="accordion custom-accordion" id="faqAccordion">
                            {[
                                { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password'. Follow the instructions sent to your email." },
                                { q: "Can I download courses offline?", a: "Currently, courses are only available for streaming online to ensure content security." },
                                { q: "How do I become an instructor?", a: "Sign up as an instructor and submit your profile for approval. Once approved, you can start creating courses." },
                                { q: "What is the refund policy?", a: "We offer a 30-day money-back guarantee if you are not satisfied with a course." },
                            ].map((item, i) => (
                                <div className="accordion-item border-0 shadow-sm mb-3 rounded overflow-hidden" key={i}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}>
                                            {item.q}
                                        </button>
                                    </h2>
                                    <div id={`collapse${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body text-muted">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HelpCenter;
