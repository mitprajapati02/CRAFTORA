import React from 'react';
import { useState } from 'react';
import axios from 'axios';



import '../assets/styles/ForgotPass.css'

import { Link } from 'react-router-dom';







const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate new password length
        if (formData.newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }

        // Retrieve token safely
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;

        if (!token) {
            setError("User not authenticated. Please log in again.");
            return;
        }

        const dataWithToken = { ...formData, token };

        try {
            const response = await axios.patch(
                "http://localhost:5001/api/user/change-password",
                dataWithToken,
                {
                    headers: { "Content-Type": "application/json" }, // Ensure JSON format
                }
            );

            setMessage(response.data.message);
            setError("");
            
        } catch (error) {
            console.error("Error:", error.response || error.message); // Log for debugging
            setError(error.response?.data?.message || "Something went wrong.");
        }
    };





    return (
        <main className="main-content">
            <div className="forgot-password-form">
                <h3>Change Your Password</h3>
                <p>Enter your current and new password.</p>

                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            name="currentPassword"
                            className="form-control"
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            style={{ backgroundColor: 'black' }}
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New Password (min. 6 characters)"
                            value={formData.newPassword}
                            onChange={handleChange}
                            style={{ backgroundColor: 'black' }}
                            required
                        />
                        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary">Change Password</button>
                </form>

                {message && <p className="mt-3">{message}</p>}

                <p className="mt-3">
                    <Link to="/user-profile">Back to Profile</Link>
                </p>
            </div>
        </main>
    );
};

export default ChangePassword;