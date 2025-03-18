import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/UserDashboard.css"

const socialMediaData = [
  {
    id: 1,
    platform: "Facebook",
    icon: "bi bi-facebook",
    tasks: ["Update Page", "Reply Comments"],
  },
  {
    id: 2,
    platform: "Instagram",
    icon: "bi bi-instagram",
    tasks: ["Post Story", "Follow Back"],
  },
  {
    id: 3,
    platform: "Twitter",
    icon: "bi bi-twitter",
    tasks: ["Schedule Tweets", "Engage Followers"],
  },
  {
    id: 4,
    platform: "Instagram",
    icon: "bi bi-instagram",
    tasks: ["Post Story", "Follow Back"],
  },
  {
    id: 5,
    platform: "Twitter",
    icon: "bi bi-twitter",
    tasks: ["Schedule Tweets", "Engage Followers"],
  },
  {
    id: 6,
    platform: "Instagram",
    icon: "bi bi-instagram",
    tasks: ["Post Story", "Follow Back"],
  },
  {
    id: 7,
    platform: "Facebook",
    icon: "bi bi-facebook",
    tasks: ["Update Page", "Reply Comments"],
  },
  {
    id: 8,
    platform: "Instagram",
    icon: "bi bi-instagram",
    tasks: ["Post Story", "Follow Back"],
  },
  {
    id: 9,
    platform: "Twitter",
    icon: "bi bi-twitter",
    tasks: ["Schedule Tweets", "Engage Followers"],
  },
];


const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="main-container hide-scrollbar main-content">
      {socialMediaData.map((data, index) => (
        <div
          key={data.id}
          className={`card-container ${index % 2 === 0 ? "odd-card" : "even-card"}`}
        >
          <div className="card-flip">
            <div className="card-front">
              <i className={data.icon}></i>
            </div>
            <div className="card-back">
              <h5>{data.platform}</h5>
              <ul>
                {data.tasks.map((task, i) => (
                  <li key={i}>
                    {task} <button><i className="bi bi-check2"></i></button>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Card */}
      
      <div className="add-card">
        <center>
          {user ? (<Link to="/addMedia" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>):(
            <Link to="/login" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>
          )}
        </center>
      </div>
      
    </div>
  );
};

export default UserDashboard;
