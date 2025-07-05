import { AnimateRecipeCard } from "../components/ui/cards/AnimateRecipeCard";
import { useSliding } from "../hooks/useSliding";
import styles from "./RecipePage.module.css";
import ReturnButton from "../components/ui/button/ReturnButton";
import { useRecipes } from "../hooks/useRecipes";
import Container from "../components/ui/container/Container";
import LoadingModal from "../components/ui/modal/LoadingModal";

const RecipePage = () => {
  const { data: recipes = [], isLoading, isError } = useRecipes();

  const { currentIndex, handleNext, handlePrev } = useSliding(recipes.length);
  const disableArrows = recipes.length <= 1;

  if (isLoading) return <LoadingModal />;
  if (isError) return <p>Error fetching recipes</p>;

  return (
    <div className={styles["recipe-page"]}>
      <Container>
        <ReturnButton />
        {recipes.length === 0 ? (
          <>
            <p>No recipes found for the selected tags.</p>
          </>
        ) : (
          <AnimateRecipeCard
            recipe={recipes[currentIndex]}
            tags={[]}
            onNext={handleNext}
            onPrev={handlePrev}
            disableArrows={disableArrows}
          />
        )}
      </Container>
    </div>
  );
};

export default RecipePage;
