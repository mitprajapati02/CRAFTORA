import { useState, useEffect } from "react";
import { apiRequest } from "../utils/apiService";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function AdminPanelLol() {
    const [userApps, setUserApps] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApps = async () => {
            if (user) {
                try {
                    const apps = await apiRequest('social/lol', 'GET'); // ✅ Expect array directly
                    console.log("✅ Fetched Apps:", apps);
    
                    if (Array.isArray(apps)) {
                        setUserApps(apps); // ✅ Store directly in state
                    } else {
                        console.error("❌ Invalid response format. Expected an array, got:", apps);
                    }
                } catch (error) {
                    console.error("❌ Error fetching social media apps:", error);
                }
            }
        };
    
        fetchApps();
    }, []);
    
    
    
    
    


    const handleDelete = async (appId) => {
        if (!window.confirm('Are you sure you want to delete this app?')) return;

        try {
            const response = await axios.delete(`http://localhost:5001/api/social/socialApp/${appId}`);
            alert(response.data.message);
            navigate('/user-dashboard');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error deleting app:', error);
            alert(error.response?.data?.error || 'Failed to delete app');
        }
    };

    return (
        <div className="container-5 " style={{width:'100%'}}>
            {userApps?.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Media Name</th>
                            <th>Bio</th>
                            <th>Reminders</th>
                            <th>States</th>
                            <th>Tags</th>
                            <th>To-Do Lists</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{border: 'black 1px solid'}}>
                        {userApps.map((app, index) => (
                            <tr key={app._id} >
                                <td>{index + 1}</td>
                                <td>{app.inMediaUsername}</td>
                                <td>{app.mediaName}</td>
                                <td>{app.bio}</td>
                                <td>
                                    {app.reminders?.length > 0
                                        ? app.reminders.map((reminder) => <div key={reminder._id}>{reminder.reminder}</div>)
                                        : "No reminders"}
                                </td>
                                <td>
                                    {app.states
                                        ? Object.values(app.states).map((state, idx) => <div key={idx}>{state}</div>)
                                        : "No states"}
                                </td>
                                <td>
                                    {app.tags?.length > 0
                                        ? app.tags.map((tag, idx) => <span key={idx} className="badge bg-primary me-1">{tag}</span>)
                                        : "No tags"}
                                </td>
                                <td>
                                    {app.todoLists?.length > 0
                                        ? app.todoLists[0].tasks.map((task) => (
                                            <div key={task._id}>
                                                {task.task} {task.completed && <FaCheck className="text-success" />}
                                            </div>
                                        ))
                                        : "No tasks"}
                                </td>
                                <td>
                                    <Button variant="info" onClick={() => navigate(`/app-dashboard/${app._id}`)} >
                                        <FaEye />
                                    </Button>{" "}
                                    <Button variant="danger" onClick={() => handleDelete(app._id)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No apps available</p> // ✅ Proper fallback
            )}
        </div>
    );
    
    
}

export default AdminPanelLol;
