"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast'; 
import withProtectedRoute from "../components/Wrapper/protectedroute";

const AddRecipe = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image_url: "",
    chef: null,
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        chef: user,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url" && files.length > 0) {
      setFormData({ ...formData, image_url: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image
      const imageFormData = new FormData();
      imageFormData.append("image", formData.image_url);
      const imageResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=34ef744f3065352f950f2d56538afc4f",
        {
          method: "POST",
          body: imageFormData,
        }
      );
      const imageData = await imageResponse.json();
      const image_url = imageData.data.url;

      // Add recipe
      const response = await fetch(
        "https://chefhub-backend.onrender.com/recipe/recipes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            image_url: image_url,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      toast.success("Successfully added!");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        image_url: "",
        chef: user,
      });
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <h2 className="text-center mt-5 text-2xl font-semibold mb-5">
        Add Recipe
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
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
          <label
            htmlFor="ingredients"
            className="block text-gray-700 font-medium mb-2"
          >
            Ingredients
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-gray-700 font-medium mb-2"
          >
            Instructions
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-gray-700 font-medium mb-2"
          >
            Image
          </label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="image_url"
            name="image_url"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default withProtectedRoute(AddRecipe);
