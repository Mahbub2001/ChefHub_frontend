"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditRecipe = ({ searchParams }) => {
  const recipe = JSON.parse(searchParams.recipe);
  const id = recipe.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: id,
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    creation_date: recipe.creation_date,
    image_url: recipe.image_url ? recipe.image_url : "",
    chef: recipe.chef,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const response = await fetch(
        `https://chefhub-backend.onrender.com/recipe/recipes/${id}/`,
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
        throw new Error("Failed to update recipe");
      }
      alert("Recipe updated successfully");
      router.push("/my_recipe");
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response) {
        console.error("Response data:", await error.response.json());
      }
      alert("Failed to update recipe");
    }
  };
  return (
<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <h2 className="text-center text-2xl font-semibold mb-5">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
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
            Image URL
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
