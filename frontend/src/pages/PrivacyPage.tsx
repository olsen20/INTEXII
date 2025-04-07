import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Effective Date]
        </p>
        <p>
          Your privacy is important to us. This Privacy Policy explains how
          CineNiche collects, uses, and discloses information through our
          website, applications, and services. By accessing or using our
          services, you agree to the collection, use, and disclosure of your
          information as described in this policy.
        </p>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and payment information when you create an account or
          use our services. We also automatically collect information about your
          usage, such as pages visited, time spent, and interactions with our
          content.
        </p>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>
            <strong>To Provide and Improve Services:</strong> We use your
            information to operate, personalize, and enhance our services.
          </li>
          <li>
            <strong>To Communicate:</strong> We may use your contact information
            to send you notifications, updates, and marketing communications
            (where permitted).
          </li>
          <li>
            <strong>For Analytics:</strong> We analyze usage data to improve our
            website and tailor content to your interests.
          </li>
        </ul>
        <h2>3. How We Share Your Information</h2>
        <p>
          Your information may be shared with trusted third-party service
          providers who assist us in delivering our services, or as required by
          law. We do not sell your personal information.
        </p>
        <h2>4. Data Security</h2>
        <p>
          We implement various security measures to protect your information,
          including encryption and secure storage practices.
        </p>
        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. Please contact us if you wish to exercise these rights.
        </p>
        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated
          version will be posted on our website along with an updated effective
          date.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at [contact email].
        </p>
        <p>
          <em>Last Updated: April 7, 2025</em>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
