"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profile_picture: "",
    phone_number: "",
    home: "",
    gender: "",
  });
  const storedUser = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const response = await fetch(
            `https://chefhub-backend.onrender.com/chef/profile/?user=${storedUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            console.error("Failed to fetch profile data");
            return;
          }

          const data = await response.json();
          setProfileData(data);
          setFormData(data);
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        // `http://127.0.0.1:8000/chef/profile/${storedUser}/`,
        `https://chefhub-backend.onrender.com/chef/profile/${storedUser}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Failed to update profile data");
        return;
      }

      const data = await response.json();
      setProfileData(data);
      setEditMode(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">User Profile</h2>
      {profileData ? (
        <div>
          {editMode ? (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Bio:
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Profile Picture URL:
                  <input
                    type="text"
                    name="profile_picture"
                    value={formData.profile_picture}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Home:
                  <input
                    type="text"
                    name="home"
                    value={formData.home}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </label>
              </div>
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            <div>
              <p>
                <strong>Username:</strong> {profileData.username}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong>Bio:</strong> {profileData.bio}
              </p>
              <p>
                <strong>Profile Picture:</strong> {profileData.profile_picture}
              </p>
              <p>
                <strong>Phone Number:</strong> {profileData.phone_number}
              </p>
              <p>
                <strong>Home:</strong> {profileData.home}
              </p>
              <p>
                <strong>Gender:</strong> {profileData.gender}
              </p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <div>Failed to load profile data.</div>
      )}
    </div>
  );
};

export default ProfilePage;
