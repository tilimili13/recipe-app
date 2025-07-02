import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RecipePage.module.css';
import Container from '../components/ui/container/Container';
import ReturnButton from '../components/ui/button/ReturnButton';
import { useSliding } from '../hooks/useSliding';
import { AnimateRecipeCard } from '../components/ui/cards/AnimateRecipeCard';
import { Recipe } from '../types/Recipetypes';

  const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const location = useLocation();
  const { currentIndex, handleNext, handlePrev } = useSliding(recipes.length);

  const queryParams = new URLSearchParams(location.search);
  const tags = queryParams.get('tags')?.split(',') || [];
  const disableArrows = recipes.length <= 1;

  useEffect(() => {
    if (tags.length === 0) return;

    fetch(`http://your-ec2-backend.com/api/recipes?tags=${tags.join(',')}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error("Invalid data from server:", data);
          setRecipes([]);
        }
        console.log('Fetched recipes:', data, 'Count:', data.length);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch recipes:", err);
        setRecipes([]);
      });
  }, [location.search]);

  return (
    <div className={styles.container}>
      <Container>
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
      </Container>
    </div>
  );
};

export default RecipePage;

