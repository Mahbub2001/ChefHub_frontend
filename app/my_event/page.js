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
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">My Events</h2>
      {events.length > 0 ? (
        <div>
          {events.map((event) => (
            <div key={event.id} className="mb-5">
              <h3>Event Name: {event.event_name}</h3>
              <p>Description : {event.description}</p>
              <p>Date : {event.date}</p>
              <p>Location : {event.location}</p>
              <Link
                href={{
                  pathname: "/edit_event",
                  query: { event: JSON.stringify(event) },
                }}
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(event.id)} className="ml-2">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No events found.</div>
      )}
    </div>
  );
};

export default withProtectedRoute(My_Event);
