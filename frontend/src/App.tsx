import SubmitForm from './components/SubmitForm';
import Container from './components/Container';
import './App.css';
import IngredientPage from './components/IngredientPage';
import RecipePage from './components/RecipePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
      <Container>
      <h1>Recipe Generator</h1>
      <SubmitForm/>
      </Container>
}
/>
<Route
   path="/user/:name"
          element={<IngredientPage />} />
        <Route path="/recipes" element={<RecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;

