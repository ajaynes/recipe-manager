type EditPageProps = {
  params: { id: string };
};

export default function EditRecipePage({ params }: EditPageProps) {
  const recipeId = params.id;
  return (
    <>
      <h1>Edit Recipe</h1>
      <h2>this is the recipe id: {recipeId}</h2>
    </>
  );
  // useEffect → fetch recipe using recipeId
  // useState → prefill form
}
