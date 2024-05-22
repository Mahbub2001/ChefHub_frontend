"use client";

import { useEffect, useState } from "react";

const dt_recipe = ({ params }) => {
  const { dt_recipe } = params;
  const id = dt_recipe;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: id,
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    creation_date: "",
    image_url: "",
    chef: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // const token = localStorage.getItem("token");
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
    } catch (error) {
      console.error("An error occurred:", error);
      // Log the response data if available
      if (error.response) {
        console.error("Response data:", await error.response.json());
      }
      alert("Failed to update recipe");
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchRecipe = async () => {
      if (id) {
        try {
          // const token = localStorage.getItem("token");
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const response = await fetch(
            `https://chefhub-backend.onrender.com/recipe/recipes/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setRecipe(data);
            setFormData({
              id: data.id,
              title: data.title,
              description: data.description,
              ingredients: data.ingredients,
              instructions: data.instructions,
              creation_date: data.creation_date,
              image_url: data.image_url,
              chef: data.chef,
            });
          } else {
            console.error("Failed to fetch recipe");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>; 
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

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

export default dt_recipe;
