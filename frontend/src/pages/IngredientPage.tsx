import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TagCloud from "../components/ui/tags/TagCloud";
import ReturnButton from "../components/ui/button/ReturnButton";
import RecipesButton from "../components/ui/button/RecipesButton";
import Container from "../components/ui/container/Container";
import styles from "./IngredientPage.module.css";

const fetchIngredients = async () => {
  const res = await fetch("http://localhost:5000/api/ingredients");
  if (!res.ok) throw new Error("Failed fetching ingredients");
  return res.json();
};

const IngredientPage = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data: availableTags,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });

  if (isLoading) return <p>Loading ingredients...</p>;
  if (error instanceof Error)
    return <p>Error fetching ingredients: {error.message}</p>;

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleViewRecipes = () => {
    if (selectedTags.length >= 2) {
      navigate(`/recipes?tags=${selectedTags.join(",")}`);
    }
  };

  return (
    <div>
      <Container>
        <h1 className={styles["title"]}>Welcome to the Ingredient Page</h1>
        <p className={styles["subtitle"]}>Select your ingredients here...</p>
        <TagCloud
          tags={availableTags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
        <ReturnButton />
        <RecipesButton
          isActive={selectedTags.length >= 2}
          onClick={handleViewRecipes}
        />
      </Container>
    </div>
  );
};

export default IngredientPage;
