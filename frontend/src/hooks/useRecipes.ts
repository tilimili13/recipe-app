import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/recipes";
import { useLocation } from "react-router-dom";
import { Recipe } from "../types/Recipetypes";

export const useRecipes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tags = queryParams.get("tags")?.split(",") || [];

  return useQuery<Recipe[]>({
    queryKey: ["recipes", tags],
    queryFn: async () => await fetchRecipes(tags),
    enabled: tags.length > 0,
  });
};
