"use client";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeResponse = await fetch(
          "https://chefhub-backend.onrender.com/recipelist/"
        );
        if (!recipeResponse.ok) {
          throw new Error("Failed to fetch recipe list");
        }
        const recipeData = await recipeResponse.json();
        setRecipeList(recipeData);

        const eventResponse = await fetch(
          "https://chefhub-backend.onrender.com/eventlist/"
        );
        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event list");
        }
        const eventData = await eventResponse.json();
        setEventList(eventData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Welcome to ChefHub!</h1>
    {loading && (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    )}
    <div className="md:grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Recipes</h2>
        <div className="grid grid-cols-1 gap-4">
          {recipeList.map((recipe, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded shadow-md">
              {recipe.image_url ? (
                <img src={recipe.image_url} alt={recipe.title} className="mb-2 w-full h-48 object-cover rounded" />
              ) : (
                <p className="mb-2">No image found</p>
              )}
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              {/* <p className="text-gray-700">Posted by: {recipe.chef}</p> */}
              <p className="text-gray-700">{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Events</h2>
        <div className="grid grid-cols-1 gap-4">
          {eventList.map((event, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded shadow-md">
              <h3 className="text-xl font-semibold">{event.event_name}</h3>
              {/* <p className="text-gray-700">Organizer: {event.organizer}</p> */}
              <p className="text-gray-700">Location: {event.location}</p>
              <p className="text-gray-700">Date: {event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
