import SubmitForm from './components/ui/form/SubmitForm';
import Container from './components/ui/container/Container';
import './App.css';
import IngredientPage from './pages/IngredientPage';
import RecipePage from './pages/RecipePage';
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
      <SubmitForm users={[]} onAddUser={() => {}} />
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

