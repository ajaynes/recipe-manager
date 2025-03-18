"use client";

import { useState } from "react";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        ingredients,
        instructions,
        userId: "1"
      })
    });

    if (res.ok) {
      setMessage("success");
      setTitle("");
      setIngredients("");
      setInstructions("");
    } else {
      setMessage("fail");
    }
  };

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-xl font-bold">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Recipe
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
}
