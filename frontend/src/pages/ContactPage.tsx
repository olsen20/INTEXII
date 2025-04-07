import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-5 text-start" style={{ marginTop: "80px" }}>
        <h1 className="fw-bold">Contact Us</h1>
        <br></br>
        <p>
          We’d love to hear from you! If you have any questions, comments, or
          feedback, please don’t hesitate to reach out.
        </p>
        <br></br>
        <h2 className="fw-bold">Email</h2>
        <p>
          You can email us at{" "}
          <a href="mailto:support@cineniche.com">
            <strong>support@cineniche.com</strong>
          </a>
          .
        </p>
        <br></br>
        <h2 className="fw-bold">Phone</h2>
        <p>
          You can also call us at: <strong>(801) 123-4567</strong>.
        </p>
        <br></br>
        <h2 className="fw-bold">Mailing Address</h2>
        <p>
          CineNiche
          <br />
          Brigham Young University
          <br />
          Provo, UT 84602
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
