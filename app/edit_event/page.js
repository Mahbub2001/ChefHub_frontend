"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditEvent = ({ searchParams }) => {
  const router = useRouter();
  const event = JSON.parse(searchParams.event);
  const id = event.id;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: id,
    event_name: event.event_name,
    description: event.description,
    date: event.date,
    location: event.location,
    organizer: event.organizer,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // const token = localStorage.getItem("token");
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const response = await fetch(
        `https://chefhub-backend.onrender.com/event/events/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      alert("Event updated successfully");
      router.push("/my_event");
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response) {
        console.error("Response data:", await error.response.json());
      }
      alert("Failed to update event");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
    <h2 className="text-center text-2xl font-semibold mb-5">Edit Event</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="event_name" className="block text-gray-700 font-medium mb-2">
          Event Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="event_name"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Location
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
          Date and Time
        </label>
        <input
          type="datetime-local"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Event
      </button>
    </form>
  </div>
  );
};

export default EditEvent;
