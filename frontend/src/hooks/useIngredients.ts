import { fetchIngredients } from "../api/ingredients";
import { useQuery } from "@tanstack/react-query";
import { IngredientResponse } from "../types/IngredientsResponse";

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await fetchIngredients();
      console.log("[API Raw response]", response);
      return response;
    },
    select: (data: IngredientResponse) => {
      console.log("[SELECTED]", data);
      return [
        ...new Set(data.tags.map((t) => t.ingredient?.trim()).filter(Boolean)),
      ];
    },
    staleTime: 60000,
  });
};
