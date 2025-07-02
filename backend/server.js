require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3306",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/ingredients", (_req, res) => {
  db.query("SELECT name FROM ingredients", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const names = results.map((row) => row.name);
    res.json(names);
  });
});

app.get("/api/recipes", (req, res) => {
  const tags = (req.query.tags?.split(",") || []).map((tag) => tag.trim());

  if (tags.length === 0) {
    return res.status(400).json({ error: "No tags provided" });
  }

  const placeholders = tags.map(() => "?").join(",");
  const tagCount = tags.length;
  const sql = `
    SELECT DISTINCT r.name, r.instruction
    FROM recipes r
    JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE i.name IN (${placeholders})

  `;

  const values = [...tags];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("SQL Error:", err.sqlMessage);
      console.log("Full Query:", err.sql);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
