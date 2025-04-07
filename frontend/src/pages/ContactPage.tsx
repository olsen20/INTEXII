import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TableOfContents from "../components/TableofContents";

const ContactPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <div className="row">
          {/* Left Sidebar: Table of Contents */}
          <div className="col-md-3 mb-4 border-end">
            <div className="sticky-toc">
              <div className="toc-wrapper">
                <TableOfContents />
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div className="col-md-9 text-start">
            <h1 className="fw-bold">Contact Us</h1>
            <br />
            <p>
              We’d love to hear from you! If you have any questions, comments,
              or feedback, please don’t hesitate to reach out.
            </p>
            <br />
            <h2 className="fw-bold">Email</h2>
            <p>
              You can email us at{" "}
              <a href="mailto:support@cineniche.com">
                <strong>support@cineniche.com</strong>
              </a>
              .
            </p>
            <br />
            <h2 className="fw-bold">Phone</h2>
            <p>
              You can also call us at: <strong>(801) 123-4567</strong>.
            </p>
            <br />
            <h2 className="fw-bold">Mailing Address</h2>
            <p>
              CineNiche
              <br />
              Brigham Young University
              <br />
              Provo, UT 84602
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
