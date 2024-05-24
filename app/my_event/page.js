"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import Link from "next/link";
import withProtectedRoute from "../components/Wrapper/protectedroute";

const My_Event = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

      // const storedUser = localStorage.getItem("user_id");
      // const token = localStorage.getItem("token");
      if (user) {
        try {
          const response = await fetch(
            `https://chefhub-backend.onrender.com/event/events/?chef_id=${storedUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.error("Failed to fetch user events");
            return;
          }

          const data = await response.json();
          console.log(data);
          setEvents(data);
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserEvents();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  const handleDelete = async (eventId) => {
    // const token = localStorage.getItem("token");
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      const response = await fetch(
        `https://chefhub-backend.onrender.com/event/events/${eventId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      alert("Event deleted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
    <h2 className="text-center text-2xl font-semibold mb-5">My Events</h2>
    {events.length > 0 ? (
      <div className="space-y-5">
        {events.map((event) => (
          <div key={event.id} className="p-5 border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Event Name: {event.event_name}</h3>
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {event.description}</p>
            <p className="text-gray-700 mb-1"><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-700 mb-3"><strong>Location:</strong> {event.location}</p>
            <div className="flex space-x-4">
              <Link
                href={{
                  pathname: "/edit_event",
                  query: { event: JSON.stringify(event) },
                }}
              >
                <p className="text-blue-500 hover:underline">Edit</p>
              </Link>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-700">No events found.</div>
    )}
  </div>
  );
};

export default withProtectedRoute(My_Event);
