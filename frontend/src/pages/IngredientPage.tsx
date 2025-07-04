import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagCloud from "../components/ui/tags/TagCloud";
import ReturnButton from "../components/ui/button/ReturnButton";
import RecipesButton from "../components/ui/button/RecipesButton";
import Container from "../components/ui/container/Container";
import styles from "./IngredientPage.module.css";
import { useIngredients } from "../hooks/useIngredients";
import LoadingModal from "../components/ui/modal/LoadingModal";

const IngredientPage = () => {
  const { data: uniqueTags, isLoading, isError, error } = useIngredients();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  if (isLoading) return <LoadingModal />;
  if (isError) return <p>Error fetching ingredients: {error.message}</p>;

  const handleViewRecipes = () => {
    if (selectedTags.length >= 2) {
      navigate(`/recipes?tags=${selectedTags.join(",")}`);
    }
  };

  return (
    <div>
      <Container>
        <h1 className={styles.title}>Welcome to the Ingredient Page</h1>
        <p className={styles.subtitle}>Select your ingredients here...</p>

        <TagCloud
          tags={uniqueTags || []}
          selectedTags={selectedTags}
          onTagClick={(tag) =>
            setSelectedTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
            )
          }
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
