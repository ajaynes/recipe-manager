/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("recipe:", body);

    const { title, ingredients, instructions, image, userId } = body;

    if (!title || !ingredients || !instructions || !userId) {
      console.error("Missing required fields", { title, ingredients, instructions, userId });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      console.error("User does not exist:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const newRecipe = await prisma.recipe.create({
      data: { title, ingredients, instructions, image, userId },
    });

    return NextResponse.json(newRecipe, { status: 201 });

  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}
