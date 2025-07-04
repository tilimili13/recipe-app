import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types/Recipetypes";
import { AnimateRecipeCard } from "../components/ui/cards/AnimateRecipeCard";
import { useSliding } from "../hooks/useSliding";
import styles from "./RecipePage.module.css";
import ReturnButton from "../components/ui/button/ReturnButton";
import { fetchRecipes } from "../api/recipes";

const RecipePage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const tags = queryParams.get("tags")?.split(",") || [];

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes", tags],
    queryFn: () => fetchRecipes(tags),
    enabled: tags.length > 0,
  });

  const { currentIndex, handleNext, handlePrev } = useSliding(recipes.length);
  const disableArrows = recipes.length <= 1;

  if (error) return <p>Error fetching recipes</p>;

  return (
    <div className={styles["recipe-page"]}>
      {recipes.length === 0 ? (
        <>
          <p>No recipes found for the selected tags.</p>
          <ReturnButton />
        </>
      ) : (
        <AnimateRecipeCard
          recipe={recipes[currentIndex]}
          tags={tags}
          onNext={handleNext}
          onPrev={handlePrev}
          disableArrows={disableArrows}
        />
      )}
    </div>
  );
};

export default RecipePage;
