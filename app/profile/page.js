"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import Image from "next/image";
import withProtectedRoute from "../components/Wrapper/protectedroute";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upadateLoading, setupadateLoading] = useState(false);
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
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (user) {
        try {
          const response = await fetch(
            `https://chefhub-backend.onrender.com/chef/profile/?user=${storedUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
    setupadateLoading(true);
    if (typeof window === "undefined") {
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const response = await fetch(
        // `http://127.0.0.1:8000/chef/profile/${storedUser}/`,
        `https://chefhub-backend.onrender.com/chef/profile/${storedUser}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    setupadateLoading(false);
  };

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  return (
    <div>
      {loading && (
        <div class="flex items-center justify-center h-screen">
          <div class="relative">
            <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
      {upadateLoading && (
        <div className="flex justify-center items-center">
          <button
          disabled
          type="button"
          class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
        </div>
      )}
      <h2 className="text-center mt-5 text-[20px] mb-5">
        Welcome {formData.username}
      </h2>
      {profileData ? (
        <div>
          {editMode ? (
            <form
              onSubmit={handleFormSubmit}
              className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bio:
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture URL:
                  <input
                    type="text"
                    name="profile_picture"
                    value={formData.profile_picture}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number:
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Home:
                  <input
                    type="text"
                    name="home"
                    value={formData.home}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-center items-center gap-10 p-10 bg-gray-100">
  <div className="w-64 h-64 overflow-hidden rounded-full shadow-lg">
    <Image
      src={formData.profile_picture}
      width={256}
      height={256}
      alt="Picture of the author"
      className="object-cover w-full h-full"
    />
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md w-96">
    <p className="text-lg font-semibold mb-4">
      <strong>Username:</strong> {profileData.username}
    </p>
    <p className="text-lg mb-4">
      <strong>Email:</strong> {profileData.email}
    </p>
    <p className="text-lg mb-4">
      <strong>Bio:</strong> {profileData.bio}
    </p>
    <p className="text-lg mb-4">
      <strong>Phone Number:</strong> {profileData.phone_number}
    </p>
    <p className="text-lg mb-4">
      <strong>Home:</strong> {profileData.home}
    </p>
    <p className="text-lg mb-4">
      <strong>Gender:</strong> {profileData.gender}
    </p>
    <button
      onClick={() => setEditMode(true)}
      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Edit Profile
    </button>
  </div>
</div>

          )}
        </div>
      ) : (
        <div>Failed to load profile data.</div>
      )}
    </div>
  );
};

export default withProtectedRoute(ProfilePage);
