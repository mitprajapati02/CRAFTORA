import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../assets/styles/ForgotPass.css'

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            setMessage('Token is required.');
        }

        const checkToken = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/user/check-token/${token}`);
                if (response.status === 200) {
                    setMessage('Token is valid.');
                } else {
                    navigate('/login');
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error checking token:', error);
                navigate('/login');
            }
        }
        checkToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await axios.patch('http://localhost:5001/api/user/reset-password', {
                token,
                newPassword
            });

            setMessage(response.data.message);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error resetting password:', error);
            setMessage('Something went wrong. Try again.');
        }
    };




    return (
        <main className="main-content">
            <div className="forgot-password-form">
                <h3>Reset Your Password</h3>
                <p>Enter your new password.</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="New Password (min. 6 characters)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>

                {message && <p className="mt-3">{message}</p>}
            </div>
        </main>
    );
};

export default ResetPassword;
