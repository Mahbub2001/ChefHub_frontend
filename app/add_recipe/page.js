"use client";

import React, { useState, useEffect } from "react";

const AddRecipe = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image_url: null,
    chef: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        chef: user,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://chefhub-backend.onrender.com/recipe/recipes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }
      alert("Recipe added successfully");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        image_url: null,
      });
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
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
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            className="form-control"
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image_url" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
