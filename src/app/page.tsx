"use client";

import { useEffect, useState } from "react";
import AddRecipe from "./components/AddRecipe";
import SearchRecipes from "./components/SearchRecipes";
import EditRecipe from "./components/EditRecipe";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  steps: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Recipe Manager</h1>
      <SearchRecipes />
      <AddRecipe />
      {recipes.length > 0 ? (
        <ul className="mt-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="border p-4 my-2 rounded-lg">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p className="text-gray-700">{recipe.ingredients}</p>
              <EditRecipe id={recipe.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No recipes found. Add one above!</p>
      )}
    </div>
  );
}
