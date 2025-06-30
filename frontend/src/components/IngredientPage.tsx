import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagCloud from './TagCloud';
import ReturnButton from './ReturnButton';
import RecipesButton from './RecipesButton';
import Container from './Container';
import styles from './IngredientPage.module.css';

const IngredientPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/ingredients')
      .then((res) => res.json())
      .then((data) => {
        console.log('Received:', data);
        setAvailableTags(data);
      })
      .catch((err) => console.error('Error fetching ingredients:', err));
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleViewRecipes = () => {
    if (selectedTags.length >= 2) {
      navigate(`/recipes?tags=${selectedTags.join(',')}`);
    }
  };

  return (
    <div>
      <Container>
        <h1 className={styles['title']}>Welcome to the Ingredient Page</h1>
        <p className={styles['subtitle']}>Select your ingredients here...</p>
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
