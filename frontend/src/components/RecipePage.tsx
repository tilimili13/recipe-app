import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RecipePage.module.css';
import Container from './Container';
import ReturnButton from './ReturnButton';
import { motion, AnimatePresence } from 'framer-motion';

  interface Recipe {
  id: number;
  name: string;
  instruction: string;
  
}
  const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const tags = queryParams.get('tags')?.split(',') || [];

  const handleNext = () => {
    console.log('Next clicked');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const disableArrows = recipes.length <= 1;

  const handlePrev = () => {
    console.log('Prev clicked');
    setCurrentIndex((prev) =>
      prev === 0 ? recipes.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (tags.length === 0) return;

    fetch(`http://your-ec2-backend.com/api/recipes?tags=${tags.join(',')}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
          setCurrentIndex(0);
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
          <AnimatePresence mode="wait">
            <motion.div
              key={recipes[currentIndex].id || recipes[currentIndex].name}
              className={styles.recipeCard}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1>{recipes[currentIndex].name}</h1>
              <div className={styles.ingredientTags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p>{recipes[currentIndex].instruction}</p>

               {recipes.length > 1 && (
              <div className={styles.recipeArrows}>
                <button onClick={handlePrev} disabled={disableArrows}>←</button>
                <button onClick={handleNext} disabled={disableArrows}>→</button>
              </div>
              )}
              <ReturnButton />
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </div>
  );
};

export default RecipePage;

