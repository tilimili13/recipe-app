import "./App.css";
import IngredientPage from "./pages/IngredientPage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/ui/container/Container";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <HomePage />
            </Container>
          }
        />
        <Route path="/user/:name" element={<IngredientPage />} />
        <Route path="/recipes" element={<RecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
