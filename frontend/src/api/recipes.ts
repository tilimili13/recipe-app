export const fetchRecipes = async (tags: string[]) => {
  const res = await fetch(`http://localhost:5000/?tags=${tags.join(",")}`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
};
