import React, { useState } from "react";

import "../assets/styles/AddMedia.css"

const AddMedia = () => {
  const [formData, setFormData] = useState({
    appName: "",
    appImage: "",
    inAppUsername: "",
    inAppProfile: "",
    stat1: "",
    value1: "",
    stat2: "",
    value2: "",
    stat3: "",
    value3: "",
    url: "",
    bio: "",
    tag1: "",
    tag2: "",
    tag3: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };


  return (
    <main className="main-content hide-scrollbar">
      <div>
        <h2 className="text-center">Add App Details</h2>
        <form style={{ marginTop: "50px" }} onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="appName" className="form-label">
              App Name
            </label>
            <select id="appName" className="form-select" required onChange={handleChange}>
              <option value="" disabled>
                Select App Name
              </option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="appImage" className="form-label">
              App Image
            </label>
            <select id="appImage" className="form-select" onChange={handleChange}>
              <option value="" disabled>
                Select App Image
              </option>
              <option value="image1.png">image1.png</option>
              <option value="image2.png">image2.png</option>
              <option value="image3.png">image3.png</option>
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="inAppUsername" className="form-label">
              In-App Username
            </label>
            <input type="text" className="form-control" id="inAppUsername" placeholder="Enter in-app username" onChange={handleChange} />
          </div>


          <div className="mb-3">
            <label htmlFor="inAppProfile" className="form-label">
              In-App Profile Image
            </label>
            <input type="text" className="form-control" id="inAppProfile" placeholder="Enter profile image URL" onChange={handleChange} />
          </div>


          {[1, 2, 3].map((num) => (
            <div className="row" key={num}>
              <div className="col-md-6 mb-3">
                <label htmlFor={`stat${num}`} className="form-label">
                  Stat {num}
                </label>
                <input type="text" className="form-control" id={`stat${num}`} placeholder="Enter stat name" onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor={`value${num}`} className="form-label">
                  Value {num}
                </label>
                <input type="text" className="form-control" id={`value${num}`} placeholder="Enter value" onChange={handleChange} />
              </div>
            </div>
          ))}


          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              App URL
            </label>
            <input type="url" className="form-control" id="url" placeholder="Enter app URL" onChange={handleChange} />
          </div>


          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea id="bio" className="form-control" rows="3" placeholder="Enter bio or description" onChange={handleChange}></textarea>
          </div>


          <div className="row">
            {[1, 2, 3].map((num) => (
              <div className="col-md-4 mb-3" key={num}>
                <label htmlFor={`tag${num}`} className="form-label">
                  Tag {num}
                </label>
                <input type="text" className="form-control" id={`tag${num}`} placeholder={`Enter tag ${num}`} onChange={handleChange} />
              </div>
            ))}
          </div>


          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddMedia;
