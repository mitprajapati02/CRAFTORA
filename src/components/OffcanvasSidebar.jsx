import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/apiService';

import '../assets/styles/sidebar.css';
import '../assets/styles/offcanvas.css';

const OffcanvasSidebar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                const response = await apiRequest('social/tasks', 'GET');
                setData(response || []); // Ensure data is always an array
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching social media tasks:', error);
            }
        };
        if (user) fetchUserTasks();
    }, []);

    const handleProfile = () => {
        if (user) {
            navigate('/user-profile');
        } else {
            navigate('/login');
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="offcanvas offcanvas-end" id="sidebarOffcanvas">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">Sidebar</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                {/* Top Section: Profile */}
                <div className="top-section">
                    <button className="btn btn-primary w-100 mb-3 mt-3" onClick={handleProfile}>Profile</button>
                </div>

                {/* Reminders Section */}
                <div className="reminders-section mt-4">
                    <h5>Reminders</h5>
                    <ul className="list-group mt-2">
                        {data.length > 0 ? (
                            data.slice(0, 3).map((app, appIndex) =>
                                (app.reminders || [])
                                    .filter(reminder => new Date(reminder.date) >= new Date().setHours(0, 0, 0, 0))
                                    .slice(0, 3)
                                    .map((reminder, index) => (
                                        <li key={`${appIndex}-${index}`} className="list-group-item">
                                            <span className="reminder-name">{reminder.reminder}</span>
                                            <br />
                                            <small className="reminder-date">{new Date(reminder.date).toLocaleDateString()}</small>
                                        </li>
                                    ))
                            )
                        ) : (
                            <li className="list-group-item">No reminders available</li>
                        )}
                    </ul>
                </div>

                {/* To-Do List Section */}
                <div className="todo-section mt-4">
                    <h5>To-Do List</h5>
                    <ul className="list-group mt-2">
                        {data.length > 0 ? (
                            data.slice(0, 3).map((app, appIndex) =>
                                (app.tasks || []).slice(0, 3).map((task, index) => (
                                    <li key={`${appIndex}-${index}`} className="list-group-item">
                                        <span className="todo-name">{task.task}</span>
                                        <br />
                                        <small className="app-name">{app.platform}</small>
                                    </li>
                                ))
                            )
                        ) : (
                            <li className="list-group-item">No tasks available</li>
                        )}
                    </ul>
                </div>

                {/* Sign Out Button */}
                <div className="bottom-section mt-auto">
                    <button className="btn btn-danger w-100" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    );
};

export default OffcanvasSidebar;
