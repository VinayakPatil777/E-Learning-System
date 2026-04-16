import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/Footer";

const TermsOfService = () => {
    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="container py-5 my-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <span className="text-purple fw-bold mb-2 d-block">Legal</span>
                        <h1 className="fw-bold display-5 mb-4 text-dark">Terms of Service</h1>
                        <p className="lead text-muted mb-5">
                            Last updated: January 26, 2026. Please read these terms carefully before using our platform.
                        </p>

                        <div className="prose">
                            <h4 className="fw-bold text-dark mb-3">1. Acceptance of Terms</h4>
                            <p className="text-muted mb-4">
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>

                            <h4 className="fw-bold text-dark mb-3">2. Description of Service</h4>
                            <p className="text-muted mb-4">
                                Our platform provides an online learning environment ("Service"). You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges).
                            </p>

                            <h4 className="fw-bold text-dark mb-3">3. User Conduct</h4>
                            <p className="text-muted mb-4">
                                You agree to not use the Service to:
                                <ul className="mt-2">
                                    <li>Upload content that is unlawful, harmful, or abusive.</li>
                                    <li>Impersonate any person or entity.</li>
                                    <li>Upload any content that you do not have a right to transmit.</li>
                                </ul>
                            </p>

                            <h4 className="fw-bold text-dark mb-3">4. Intellectual Property</h4>
                            <p className="text-muted mb-4">
                                All content provided on this platform is the property of the respective instructors or the platform itself. You may not reproduce, distribute, or create derivative works from this content without explicit permission.
                            </p>

                            <div className="bg-light p-4 rounded-4 mt-5 border">
                                <h5 className="fw-bold">Questions?</h5>
                                <p className="mb-0 text-muted">If you have any questions about these Terms, please contact us at <a href="/contact" className="text-purple fw-bold">support@vedalearning.com</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsOfService;
