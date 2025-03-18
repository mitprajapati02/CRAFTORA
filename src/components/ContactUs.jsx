import React from "react";

import "../assets/styles/AddMedia.css"

const ContactUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <p className="text-center text-muted mb-4">
        We’d love to hear from you! Reach out to us through the following channels.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Email Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Email</h5>
              <p className="card-text">
                <a href="mailto:contact@craftora.com">contact@craftora.com</a>
              </p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Phone</h5>
              <p className="card-text">+91 9099227702</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Address</h5>
              <p className="card-text">123 Craftora Street, Dashboard City, 56789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
