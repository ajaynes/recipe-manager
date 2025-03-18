import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("s");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.meals) {
      return NextResponse.json({ error: "No recipes found" }, { status: 404 });
    }

    // console.log(NextResponse.json(data.meals))

    return NextResponse.json(data.meals);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch recipes: ${error}` }, { status: 500 });
  }
}
