import { useState } from "react";

import "../assets/styles/AppDashboard.css"

const AppDashboard = () => {
    const [profile, setProfile] = useState({
        username: "Username",
        profilePhoto: "https://via.placeholder.com/100",
        stats: { stat1: 100, stat2: 200, stat3: 300 },
    });

    const [reminders, setReminders] = useState([
        { text: "Reminder 1", date: "2024-12-20" },
        { text: "Reminder 2", date: "2024-12-21" },
    ]);

    const [todos, setTodos] = useState([
        { text: "Task 1", completed: false },
        { text: "Task 2", completed: true },
    ]);

    const [bio, setBio] = useState("My awesome bio...");

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
                <div className="col-lg-4 first-div color_card1 p-3">
                    <div className="text-center">
                        <img src={profile.profilePhoto} alt="Profile" className="profile-photo mb-3" />
                        <h4>{profile.username}</h4>
                        <div className="d-flex justify-content-around mt-3">
                            {Object.entries(profile.stats).map(([key, value]) => (
                                <div key={key}>
                                    <h6>{key}</h6>
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>
                        <a href="#" className="btn btn-primary mt-3">Visit Profile</a>
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
                        {reminders.map((reminder, index) => (
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
            <div className="row mt-4">
                <div className="col-lg-6 alert color_card2 p-3">
                    <h4>To-Do</h4>
                    <button className="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#addTodoForm">
                        <i className="bi bi-plus"></i>
                    </button>
                    <ul className="list-group mt-3" >
                        {todos.filter(task => !task.completed).map((task, index) => (
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

                {/* Completed Tasks */}
                <div className="col-lg-6 color_card2 p-3">
                    <h4>Completed</h4>
                    <ul className="list-group mt-3">
                        {todos.filter(task => task.completed).map((task, index) => (
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
                <p>{bio}</p>
                <button className="btn btn-outline-secondary mt-2" data-bs-toggle="collapse" data-bs-target="#editBioForm">
                    <i className="bi bi-pencil"></i>
                </button>
                <div className="collapse mt-3" id="editBioForm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setBio(e.target.bio.value);
                        }}
                    >
                        <textarea className="form-control mb-2" name="bio" rows="3" defaultValue={bio} required></textarea>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppDashboard;
