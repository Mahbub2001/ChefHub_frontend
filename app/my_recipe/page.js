"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import Link from "next/link";
import withProtectedRoute from "../components/Wrapper/protectedroute";
import Image from "next/image";

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <h2 className="text-center text-2xl font-semibold mb-5">My Recipes</h2>
      {recipes.length > 0 ? (
        <div className="grid gap-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 border border-gray-200 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Title: {recipe.title}</h3>
              {recipe.image_url ? (
                <Image
                  src={recipe.image_url}
                  width={200}
                  height={200}
                  alt={`Image of ${recipe.title}`}
                  className="rounded-lg mb-2"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
              <p className="text-gray-700 mb-1"><strong>Description:</strong> {recipe.description}</p>
              <p className="text-gray-700 mb-1"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="text-gray-700 mb-1"><strong>Instructions:</strong> {recipe.instructions}</p>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={{
                    pathname: "/edit_recipe",
                    query: { recipe: JSON.stringify(recipe) },
                  }}
                >
                  <p className="text-blue-500 hover:underline">Edit</p>
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No recipes found.</div>
      )}
    </div>
  );
};

export default withProtectedRoute(My_Recipe);
