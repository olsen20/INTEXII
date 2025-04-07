import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-5 text-start" style={{ marginTop: "80px" }}>
        <h1 className="fw-bold">Terms of Service</h1>
        <br></br>
        <p>
          <strong>Effective Date:</strong> April 7, 2025
        </p>
        <p>
          Welcome to CineNiche! These Terms of Service (“Terms”) govern your use
          of our website, applications, and services. By using our services, you
          agree to these Terms. If you do not agree with any part of these
          Terms, please do not use our services.
        </p>
        <br></br>
        <h2 className="fw-bold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these
          Terms and any additional terms referenced herein.
        </p>
        <br></br>
        <h2 className="fw-bold">2. Use of Our Services</h2>
        <ul>
          <li>
            You must be at least 13 years old (or as required by applicable law)
            to use our services.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You agree to use our services in compliance with all applicable laws
            and regulations.
          </li>
        </ul>
        <br></br>
        <h2 className="fw-bold">3. Content</h2>
        <p>
          Our services may include content from various sources. We do not
          guarantee the accuracy, completeness, or reliability of any content.
          You are responsible for any content you post and must ensure that it
          does not infringe on the rights of others.
        </p>
        <br></br>
        <h2 className="fw-bold">4. Intellectual Property</h2>
        <p>
          All content and intellectual property on our services, including
          logos, images, and text, are owned by CineNiche or its licensors. You
          may not use any of our intellectual property without prior written
          consent.
        </p>
        <br></br>
        <h2 className="fw-bold">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you
          violate these Terms. Upon termination, your right to use our services
          will cease immediately.
        </p>
        <br></br>
        <h2 className="fw-bold">6. Disclaimers and Limitation of Liability</h2>
        <p>
          Our services are provided “as is” without warranties of any kind.
          CineNiche is not liable for any indirect, incidental, or consequential
          damages arising from your use of our services.
        </p>
        <br></br>
        <h2 className="fw-bold">7. Governing Law</h2>
        <p>
          These Terms are governed by the laws of [Jurisdiction], without regard
          to its conflict of laws principles.
        </p>
        <br></br>
        <h2 className="fw-bold">8. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of our
          services after any changes constitutes your acceptance of the new
          Terms.
        </p>
        <br></br>
        <h2 className="fw-bold">9. Contact Information</h2>
        <p>
          For any questions regarding these Terms, please contact us at [contact
          email].
        </p>
        <br></br>
        <p>
          <em>Last Updated: April 7, 2025</em>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
