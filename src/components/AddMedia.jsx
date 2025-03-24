import React, { useState } from 'react';
import { apiRequest } from '../utils/apiService';
import { useNavigate } from 'react-router-dom';


import '../assets/styles/AddMedia.css'
import { OptionIcon } from 'lucide-react';


const AddMedia = () => {
  const [formData, setFormData] = useState({
    mediaName: '',
    inMediaUsername: '',
    bio: '',
    url: '',
    tag1: '',
    tag2: '',
    tag3: '',
    stat1: '',
    value1: '',
    stat2: '',
    value2: '',
    stat3: '',
    value3: '',
  });


  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const formattedData = {
      mediaName: formData.mediaName,
      inMediaUsername: formData.inMediaUsername,
      bio: formData.bio || '',
      states: {
        stat1: formData.stat1,
        stat2: formData.stat2,
        stat3: formData.stat3,
      },
      values: {
        value1: formData.value1,
        value2: formData.value2,
        value3: formData.value3,
      },
      tags: [formData.tag1, formData.tag2, formData.tag3].filter(Boolean),
      url: formData.url,
    };

    try {
      await apiRequest('social/socialApp', 'POST', formattedData);

      alert('App details added successfully!');

      setFormData({
        mediaName: '',
        inMediaUsername: '',
        bio: '',
        url: '',
        tag1: '',
        tag2: '',
        tag3: '',
        stat1: '',
        value1: '',
        stat2: '',
        value2: '',
        stat3: '',
        value3: '',
      });

      navigate('/user-dashboard');

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      alert('Failed to add app details. Please try again.');
    }
  };

  return (
    <main className="main-content hide-scrollbar">
      <div>
        <h2 className="text-center">Add App Details</h2>


        <form style={{ marginTop: '50px' }} onSubmit={handleSubmit}>


          <div className="mb-3">
            <label htmlFor="mediaName" className="form-label">
              App Name
            </label>
            <select
              id="mediaName"
              className="form-select"
              required
              onChange={handleChange}
              value={formData.mediaName} // Bind value to state
            >
              <option value="" disabled>
                Select App Name
              </option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Snapchat">Snapchat</option>
              <option value="YouTube">YouTube</option>
              <option value="Pinterest">Pinterest</option>
              <option value="LeetCode">LeetCode</option>
              <option value="Codeforces">Codeforces</option>
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="inMediaUsername" className="form-label">
              In-App Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inMediaUsername"
              placeholder="Enter in-app username"
              required
              onChange={handleChange}
              value={formData.inMediaUsername}
            />
          </div>

          <div className="row">
            {[1, 2, 3].map((num) => (
              <div className="col-md-4 mb-3" key={num}>
                {/* Stat Input */}
                <label htmlFor={`stat${num}`} className="form-label">
                  Stat {num}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`stat${num}`}
                  value={formData[`stat${num}`]}
                  placeholder="Enter stat name"
                  onChange={handleChange}
                />

                {/* Value Input */}
                <label htmlFor={`value${num}`} className="form-label mt-2">
                  Value {num}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`value${num}`}
                  value={formData[`value${num}`]}
                  placeholder="Enter value"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>


          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              App URL
            </label>
            <input type="url" className="form-control" id="url" placeholder="Enter app URL" onChange={handleChange}
              value={formData.url}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              className="form-control"
              rows="3"
              placeholder="Enter bio or description"
              onChange={handleChange}
              value={formData.bio}
            ></textarea>
          </div>


          <div className="row">
            {[1, 2, 3].map((num) => (
              <div className="col-md-4 mb-3" key={num}>
                <label htmlFor={`tag${num}`} className="form-label">
                  Tag {num}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`tag${num}`}
                  value={formData[`tag${num}`]}
                  placeholder={`Enter tag ${num}`}
                  onChange={handleChange}
                />
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
