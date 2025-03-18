'use client';

import { useState } from 'react';

interface TheMealDBRecipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: `strIngredient${number}`]: string | null;
  }


export default function SearchRecipes() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(`/api/external/recipes?s=${query}`);
    const data = await res.json();

    if (data.error) {
      setRecipes([]);
    } else {
      setRecipes(data);
    }
  };


  const handleImport = async (recipe: TheMealDBRecipe) => {
    const validUserId = "1";

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient);
      }
    }

    const recipeData = {
      title: recipe.strMeal,
      ingredients: ingredients.join(", "),
      instructions: recipe.strInstructions,
      image: recipe.strMealThumb || "",
      userId: validUserId,
    };

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    const responseData = await res.json();
    // console.log("server:", responseData);

    if (res.ok) {
      alert("success");
    } else {
      alert(`fail: ${responseData.error}`);
    }
  };

  return (
    <div className='p-4 border rounded-lg mt-4'>
      <h2 className='text-xl font-bold'>Search Recipes</h2>
      <input
        type='text'
        placeholder='Search for a recipe...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='border p-2 rounded w-full'
      />
      <button onClick={handleSearch} className='bg-blue-500 text-white p-2 mt-2 rounded'>
        Search
      </button>

      {recipes.length > 0 && (
        <ul className='mt-4'>
          {recipes.map((recipe: TheMealDBRecipe) => (
            <li key={recipe.idMeal} className='border p-4 my-2 rounded-lg'>
              <h2 className='text-lg font-semibold'>{recipe.strMeal}</h2>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-32 h-32' />
              <p className='text-gray-700'>
                {recipe.strCategory} | {recipe.strArea}
              </p>
              <button onClick={() => handleImport(recipe)} className='bg-green-500 text-white p-2 rounded mt-2'>
                Import Recipe
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
