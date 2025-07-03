import styles from "./RecipesButton.module.css";

interface RecipesButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const RecipesButton: React.FC<RecipesButtonProps> = ({ isActive, onClick }) => {
  return (
    <button
      className={isActive ? styles.recipesBtnActive : styles.recipesBtnInactive}
      disabled={!isActive}
      onClick={isActive ? onClick : undefined}
    >
      Go to recipes
    </button>
  );
};

export default RecipesButton;
