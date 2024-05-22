"use client";

import React, { useState, useEffect } from "react";

const AddEvent = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  // const token = localStorage.getItem("token");
  // const user = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    date: "",
    location: "",
    organizer: null,
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        organizer: user,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://chefhub-backend.onrender.com/event/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add Event");
      }
      alert("Event added successfully");
      setFormData({
        event_name: "",
        description: "",
        location: "",
        date: "",
        image_url: "",
        organizer: user,
      });
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to add Event");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-center mt-5 text-2xl mb-5">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-3">
          <label
            htmlFor="event_name"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date">Date :</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
