import React from "react";


import "../assets/styles/ForgotPass.css"


const ChangePassword = () => {
    return (
        <main className="main-content">
            <div className="forgot-password-form">
                <h3>Change Your Password?</h3>
                <p>Enter your current password and new password.</p>

                <form>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Current Password" required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="New Password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Change Password
                    </button>
                </form>

                <p className="mt-3">
                    <Link to="/userProfile">Back to Profile</Link>
                </p>
            </div>
        </main>
    );
};

export default ChangePassword;
