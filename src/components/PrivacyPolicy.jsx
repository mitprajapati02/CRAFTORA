import React from "react";

import "../assets/styles/AddMedia.css"

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ marginTop: "50px" }}>Privacy Policy</h1>
      <p className="text-muted">Effective Date: [Insert Date]</p>

      <section className="mb-4">
        <h4>Information We Collect</h4>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and profile details.</li>
          <li><strong>Usage Data:</strong> Information about your interactions with the platform.</li>
          <li><strong>Stored Content:</strong> Data like app details, to-do lists, and reminders.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4>How We Use Your Information</h4>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our services.</li>
          <li>Personalize your experience.</li>
          <li>Communicate updates and support.</li>
          <li>Ensure security and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4>Data Security</h4>
        <p>We implement robust measures, including encryption, to protect your data.</p>
      </section>

      <section>
        <h4>Your Rights</h4>
        <ul>
          <li>Access your data.</li>
          <li>Request corrections.</li>
          <li>Delete your account and associated data.</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
