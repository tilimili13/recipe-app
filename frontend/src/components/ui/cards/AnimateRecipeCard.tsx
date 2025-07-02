import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedRecipeCard.module.css';
import { Recipe } from '../../../types/Recipetypes';

 interface Props {
  recipe: Recipe;
  tags: string[];
  onNext: () => void;
  onPrev: () => void;
  disableArrows: boolean;
}

export const AnimateRecipeCard = ({ recipe, tags, onNext, onPrev, disableArrows }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={recipe.id || recipe.name}
        className={styles.recipeCard}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>{recipe.name}</h1>
        <div className={styles.ingredientTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <p>{recipe.instruction}</p>

        {(
          <div className={styles.recipeArrows}>
            <button onClick={onPrev} disabled={disableArrows}>←</button>
            <button onClick={onNext} disabled={disableArrows}>→</button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};