"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import Link from "next/link";
import withProtectedRoute from "../components/Wrapper/protectedroute";

const My_Recipe = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const storedUser =
        typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

      // const storedUser = localStorage.getItem("user_id");
      // const token = localStorage.getItem("token");
      if (user) {
        try {
          const response = await fetch(
            `https://chefhub-backend.onrender.com/recipe/recipes/?chef_id=${storedUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.error("Failed to fetch user recipes");
            return;
          }

          const data = await response.json();
          console.log(data);
          setRecipes(data);
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserRecipes();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  const handleDelete = async (recipeId) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://chefhub-backend.onrender.com/recipe/recipes/${recipeId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to delete recipe");
    }
  };

  return (
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">My Recipes</h2>
      {recipes.length > 0 ? (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="mb-5">
              <h3>Title: {recipe.title}</h3>
              <p>Description : {recipe.description}</p>
              <p>Ingredients : {recipe.ingredients}</p>
              <p>Instructions: {recipe.instructions}</p>
              <Link
                href={{
                  pathname: "/edit_recipe",
                  query: { recipe: JSON.stringify(recipe) },
                }}
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(recipe.id)} className="ml-2">
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No recipes found.</div>
      )}
    </div>
  );
};

export default withProtectedRoute(My_Recipe);
