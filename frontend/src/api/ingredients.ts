import { IngredientResponse } from "../types/IngredientsResponse";

export const fetchIngredients = async (): Promise<IngredientResponse> => {
  const res = await fetch("http://localhost:5000/api/ingredients");

  if (!res.ok) throw new Error("Failed fetching ingredients");

  const data = await res.json();
  console.log("Raw AWS Response:", data);
  return data;
};
