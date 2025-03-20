import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";


import "../assets/styles/AppDashboard.css"


const AppDashboard = () => {
    const { appId } = useParams(); // Get appId from URL
    const [appData, setAppData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                if (!userData || !userData.token) {
                    throw new Error("User not authenticated");
                }

                const response = await axios.get(`http://localhost:5001/api/social/socialApp/${appId}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                });

                setAppData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching app details:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAppData();
    }, [appId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!appData) return <p>No data found.</p>;

    const handleAddReminder = (e) => {
        e.preventDefault();
        const newReminder = {
            text: e.target.reminder.value,
            date: e.target.date.value,
        };
        setReminders([...reminders, newReminder]);
        e.target.reset();
    };


    const handleAddTodo = (e) => {
        e.preventDefault();
        const newTask = { text: e.target.taskName.value, completed: false };
        setTodos([...todos, newTask]);
        e.target.reset();
    };


    const toggleTodo = (index) => {
        setTodos(
            todos.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };


    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
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
                            src={appData.inMediaProfileImg || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="profile-photo mb-3"
                        />
                        <h4>{appData.inMediaUsername || "Username"}</h4>

                        {/* Stats Section */}
                        <div className="d-flex justify-content-around mt-3">
                            {Object.entries(appData.states || {}).map(([key, stateValue], index) => (
                                <div key={key}>
                                    <h6>{stateValue}</h6>
                                    <p>{appData.values ? Object.values(appData.values)[index] : "N/A"}</p>
                                </div>
                            ))}
                        </div>

                        {/* Visit Profile Button */}
                        <a
                            href={appData.url || "#"}
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
                                            defaultValue={appData.values ? Object.values(appData.values)[index] : ""}
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
                        {appData.reminders?.map((reminder, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between" style={{ overflowY: "auto" }}>
                                {reminder.text} <span className="badge bg-secondary">{reminder.date}</span>
                            </li>
                        ))}
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
            <div className="row mt-4" style={{ border: "1px solid black" }}>
                <div className="col-lg-6 alert color_card2 p-3">
                    <h4>To-Do</h4>
                    <button className="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#addTodoForm">
                        <i className="bi bi-plus"></i>
                    </button>
                    <ul className="list-group mt-3">
                        {appData.todoLists?.filter(task => !task.completed).map((task, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ overflowY: "auto" }}>
                                <input type="checkbox" className="form-check-input me-2" onChange={() => toggleTodo(index)} />
                                {task.text}
                                <button className="btn btn-danger btn-sm" onClick={() => removeTodo(index)}>
                                    <i className="bi bi-dash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="collapse mt-3" id="addTodoForm">
                        <form onSubmit={handleAddTodo}>
                            <input type="text" name="taskName" className="form-control mb-2" placeholder="Enter Task" required />
                            <button type="submit" className="btn btn-primary">Add Task</button>
                        </form>
                    </div>
                </div>

                {/* Completed Tasks Section */}
                <div className="col-lg-6 color_card2 p-3">
                    <h4>Completed</h4>
                    <ul className="list-group mt-3">
                        {appData.todoLists?.filter(task => task.completed).map((task, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <input type="checkbox" className="form-check-input me-2" checked onChange={() => toggleTodo(index)} />
                                {task.text}
                                <button className="btn btn-danger btn-sm" onClick={() => removeTodo(index)}>
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
                    <p>{appData.bio}</p>
                    {appData.tags?.map((tag, index) => (
                        <span key={index} className="badge bg-primary me-2">{tag}</span>
                    ))}
                </div>

                
                <button className="btn btn-outline-secondary mt-2" data-bs-toggle="collapse" data-bs-target="#editBioForm">
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-secondary mt-2" data-bs-toggle="collapse" data-bs-target="#editBioForm">
                    <i className="bi bi-pencil"></i>
                </button>

                <div className="collapse mt-3" id="editBioForm">
                    <form onSubmit={(e) => { e.preventDefault(); setBio(e.target.bio.value); }}>
                        <textarea className="form-control mb-2" name="bio" rows="3" defaultValue={appData.bio} required></textarea>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AppDashboard;
