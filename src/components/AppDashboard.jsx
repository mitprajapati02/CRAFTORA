import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';


import '../assets/styles/AppDashboard.css'


const AppDashboard = () => {
    const { appId } = useParams(); // Get appId from URL
    const [appData, setAppData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bio, setBio] = useState('');
    const [tags, setTags] = useState([]);
    const [todoLists, setTodoLists] = useState([]);
    const [reminders, setReminders] = useState([]); // New state for reminders


    useEffect(() => {
        const fetchAppData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (!userData || !userData.token) {
                    throw new Error('User not authenticated');
                }

                const response = await axios.get(`http://localhost:5001/api/social/socialApp/${appId}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                });

                console.log(response.data);

                setAppData(response.data);
                setBio(response.data.bio || '');
                setTags(response.data.tags || []);

                // Ensure we extract the first todoList correctly if it exists
                const firstTodoList = response.data.todoLists?.[0] || { tasks: [] };
                setTodoLists(firstTodoList.tasks);

                setReminders(response.data.reminders || []);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching app details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAppData();
    }, [appId]);


    if (loading) return <p>Loading...</p>;

    if (error) return <p className="error">Error: {error}</p>;

    if (!appData) return <p>No data found.</p>;




    const handleAddReminder = async (e) => {
        e.preventDefault();
        const reminderText = e.target.reminder.value.trim();
        const reminderDate = e.target.date.value;

        if (!reminderText || !reminderDate) return alert('Both fields are required.');

        // Prevent selecting past dates
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        if (reminderDate < today) return alert('Reminder date cannot be before today.');

        try {
            const response = await axios.post(
                'http://localhost:5001/api/reminder/add',
                { reminder: reminderText, date: reminderDate },
                {
                    headers: {
                        Authorization: `Bearer ${appId}`,
                    },
                }
            );

            if (response.status === 201) {
                setAppData((prevData) => ({
                    ...prevData,
                    reminders: response.data.reminders, // Use all reminders
                }));

                e.target.reset(); // Clear input fields
            }
        } catch (error) {
            console.error('Error adding reminder:', error);
            alert('Failed to add reminder.');
        }
    };









    const handleAddTodo = async (e) => {
        e.preventDefault();
        const newTask = e.target.taskName.value.trim();
        if (!newTask) return;

        try {
            const response = await axios.put(
                'http://localhost:5001/api/todo/todoList',
                { task: newTask },
                {
                    headers: {
                        Authorization: `Bearer ${appId}`,
                    },
                }
            );

            if (response.status === 200) {
                const addedTask = response.data.task; // Extract newly added task
                setTodoLists((prevTasks) => [...prevTasks, addedTask]); // Append new task
                e.target.reset(); // Clear input
            }
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task.');
        }
    };







    const toggleTodo = async (taskId) => {
        try {
            const response = await axios.put(
                `http://localhost:5001/api/todo/toggle/${taskId}`, // API to toggle task completion
                {},
                {
                    headers: {
                        Authorization: `Bearer ${appId}`,
                    },
                }
            );

            if (response.status === 200) {
                setTodoLists((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === taskId ? { ...task, completed: !task.completed } : task
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling task:', error);
            alert('Failed to update task status.');
        }
    };



    const removeTodo = async (taskId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5001/api/todo/delete/${taskId}`, // API to delete task
                {
                    headers: {
                        Authorization: `Bearer ${appId}`,
                    },
                }
            );

            if (response.status === 200) {
                setTodoLists((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task.');
        }
    };






    // Function to handle bio update
    const handleUpdateBio = async (e) => {
        e.preventDefault();
        const updatedBio = e.target.bio.value;
        try {
            const response = await axios.put('http://localhost:5001/api/social/socialApp/updateBio', { bio: updatedBio }, {
                headers: {
                    Authorization: `Bearer ${appId}`,
                },
            });
            if (response.status === 200) {
                setBio(updatedBio); // Update UI state
                alert('Bio updated successfully!');
                document.getElementById('editBioForm').classList.remove('show');
            }
        } catch (error) {
            console.error('Error updating bio:', error);
            alert('Failed to update bio.');
        }
    };





    return (
        <div className="container mt-4">
            <div className="row">
                {/* Profile Section */}
                <div className="col-lg-4 position-relative first-div">
                    {/* Edit Button */}
                    <button
                        className="btn btn-outline-secondary btn-edit"
                        data-bs-toggle="collapse"
                        data-bs-target="#editProfileForm"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>

                    {/* Profile Section */}
                    <div className="text-center">
                        <img
                            src={appData.inMediaProfileImg || 'https://via.placeholder.com/100'}
                            alt="Profile"
                            className="profile-photo mb-3"
                        />
                        <h4>{appData.inMediaUsername || 'Username'}</h4>

                        {/* Stats Section */}
                        <div className="d-flex justify-content-around mt-3">
                            {Object.entries(appData.states || {}).map(([key, stateValue], index) => (
                                <div key={key}>
                                    <h6>{stateValue}</h6>
                                    <p>{appData.values ? Object.values(appData.values)[index] : 'N/A'}</p>
                                </div>
                            ))}
                        </div>

                        {/* Visit Profile Button */}
                        <a
                            href={appData.url || '#'}
                            className="btn btn-primary mt-3"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Profile
                        </a>
                    </div>

                    {/* Accordion Form for Editing */}
                    <div className="collapse mt-4" id="editProfileForm">
                        <form>
                            {/* Username Input */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input type="text" className="form-control" id="username" defaultValue={appData.inMediaUsername} />
                            </div>

                            {/* Profile Photo Input */}
                            <div className="mb-3">
                                <label htmlFor="profilePhoto" className="form-label">
                                    Profile Photo
                                </label>
                                <input type="file" className="form-control" id="profilePhoto" />
                            </div>

                            {/* Stats Editing Section */}
                            {Object.entries(appData.states || {}).map(([key, stateValue], index) => (
                                <div className="row" key={key}>
                                    <div className="col-6">
                                        <label className="form-label">{stateValue}</label>
                                        <input type="text" className="form-control" defaultValue={stateValue} disabled />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Value</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            defaultValue={appData.values ? Object.values(appData.values)[index] : ''}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Save Button */}
                            <button type="submit" className="btn btn-primary mt-3">
                                Save
                            </button>
                        </form>
                    </div>
                </div>


                {/* Reminders Section */}
                <div className="col-lg-8 second-div color_card4 p-3">
                    <div className="d-flex justify-content-between">
                        <h4>Reminders</h4>
                        <button className="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#addReminderForm">
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                    <ul className="list-group mt-3">
                        {appData.reminders?.length > 0 ? (
                            appData.reminders.map((reminder, index) => (
                                <li key={reminder._id} className="list-group-item d-flex justify-content-between">
                                    {reminder.reminder}
                                    <span className="badge bg-secondary">{new Date(reminder.date).toLocaleDateString()}</span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No reminders yet.</li>
                        )}
                    </ul>
                    <div className="collapse mt-3" id="addReminderForm">
                        <form onSubmit={handleAddReminder}>
                            <input type="text" name="reminder" className="form-control mb-2" placeholder="Reminder" required />
                            <input type="date" name="date" className="form-control mb-2" required />
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>


            </div>

            {/* To-Do Section */}
            <div className="row mt-4" style={{ border: '1px solid black' }}>
                {/* To-Do Section */}
                <div className="col-lg-6 alert color_card2 p-3">
                    <h4>To-Do</h4>
                    <button
                        className="btn btn-outline-secondary"
                        data-bs-toggle="collapse"
                        data-bs-target="#addTodoForm"
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                    <ul className="list-group mt-3">
                        {todoLists
                            .filter((task) => !task.completed)
                            .map((task) => (
                                <li
                                    key={task._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{ overflowY: 'auto' }}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        onChange={() => toggleTodo(task._id)}
                                    />
                                    {task.task} {/* Updated to use task.task */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeTodo(task._id)}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                </li>
                            ))}
                    </ul>
                    <div className="collapse mt-3" id="addTodoForm">
                        <form onSubmit={handleAddTodo}>
                            <input
                                type="text"
                                name="taskName"
                                className="form-control mb-2"
                                placeholder="Enter Task"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>

                {/* Completed Tasks Section */}
                <div className="col-lg-6 color_card2 p-3">
                    <h4>Completed</h4>
                    <ul className="list-group mt-3">
                        {todoLists
                            .filter((task) => task.completed)
                            .map((task) => (
                                <li
                                    key={task._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked
                                        onChange={() => toggleTodo(task._id)}
                                    />
                                    {task.task} {/* Updated to use task.task */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeTodo(task._id)}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>



            {/* Bio Section */}
            <div className="row mt-4 fourth-div color_card3 p-3">
                <h4>Bio</h4>
                <div className="bio-tags mt-3">
                    <p>{bio}</p>
                    {tags.map((tag, index) => (
                        <span key={index} className="badge bg-primary me-2">{tag}</span>
                    ))}
                </div>

                {/* Edit Bio Button */}
                <button className="btn btn-outline-secondary mt-2" data-bs-toggle="collapse" data-bs-target="#editBioForm">
                    <i className="bi bi-pencil"></i>
                </button>

                {/* Edit Bio Form */}
                <div className="collapse mt-3" id="editBioForm">
                    <form onSubmit={handleUpdateBio}>
                        <textarea className="form-control mb-2" name="bio" rows="3" defaultValue={bio} required></textarea>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AppDashboard;
