import React from "react";

import "../assets/styles/AddMedia.css"

const TermsOfService = () => {
  return (
    <main className="main-content hide-scrollbar">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Terms of Service</h1>
        <p className="text-lead">Effective Date: [Insert Date]</p>

        <section className="mb-4">
          <h4>Use of Service</h4>
          <ul>
            <li>Users must be at least 13 years old.</li>
            <li>Provide accurate registration details.</li>
            <li>Keep account credentials confidential.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Prohibited Activities</h4>
          <ul>
            <li>Using the platform for illegal purposes.</li>
            <li>Uploading harmful content or malware.</li>
            <li>Attempting to disrupt our systems.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Limitation of Liability</h4>
          <p>
            We are not liable for loss or damage resulting from using the
            platform or linked third-party services.
          </p>
        </section>

        <section>
          <h4>Modifications</h4>
          <p>
            We reserve the right to update terms at any time. Continued use
            constitutes acceptance.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsOfService;
