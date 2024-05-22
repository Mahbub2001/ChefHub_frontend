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
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">Edit Recipe</h2>
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
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
