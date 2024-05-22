"use client";

import { useEffect, useState } from "react";

const dt_event = ({ params }) => {
  const { dt_event } = params;
  const id = dt_event;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: id,
    event_name: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchEvent = async () => {
      if (id) {
        try {
          // const token = localStorage.getItem("token");
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : null;

          const response = await fetch(
            `https://chefhub-backend.onrender.com/event/events/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setEvent(data);
            setFormData({
              id: data.id,
              event_name: data.event_name,
              description: data.description,
              date: data.date,
              location: data.location,
              organizer: data.organizer,
            });
          } else {
            console.error("Failed to fetch event");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [id]);

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
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response) {
        console.error("Response data:", await error.response.json());
      }
      alert("Failed to update event");
    }
  };

  if (!id) {
    return <div>Loading...</div>; 
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="event_name" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            className="form-control"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date and Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default dt_event;
