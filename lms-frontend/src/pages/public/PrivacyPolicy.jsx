import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="container py-5 my-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <span className="text-green fw-bold mb-2 d-block">Privacy</span>
                        <h1 className="fw-bold display-5 mb-4 text-dark">Privacy Policy</h1>
                        <p className="lead text-muted mb-5">
                            We value your privacy. Last updated: January 26, 2026.
                        </p>

                        <div className="prose">
                            <h4 className="fw-bold text-dark mb-3">1. Information We Collect</h4>
                            <p className="text-muted mb-4">
                                We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, and payment method.
                            </p>

                            <h4 className="fw-bold text-dark mb-3">2. How We Use Your Information</h4>
                            <p className="text-muted mb-4">
                                We use the information we collect to:
                                <ul className="mt-2">
                                    <li>Provide, maintain, and improve our services.</li>
                                    <li>Process payments and send receipts.</li>
                                    <li>Send you technical notices, updates, and support messages.</li>
                                </ul>
                            </p>

                            <h4 className="fw-bold text-dark mb-3">3. Data Security</h4>
                            <p className="text-muted mb-4">
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                            </p>

                            <h4 className="fw-bold text-dark mb-3">4. Cookies</h4>
                            <p className="text-muted mb-4">
                                We use cookies to improve your experience on our site. By using our website, you agree to the use of cookies as outlined in this policy.
                            </p>

                            <div className="bg-light p-4 rounded-4 mt-5 border">
                                <h5 className="fw-bold">Contact Data Protection Officer</h5>
                                <p className="mb-0 text-muted">For data removal requests, please email <a href="mailto:privacy@vedalearning.com" className="text-purple fw-bold">privacy@vedalearning.com</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
