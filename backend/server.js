import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/api/ingredients", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT name AS ingredient FROM ingredients");
    res.json({ tags: rows });
  } catch (err) {
    console.error("DB Error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/recipes", async (req, res) => {
  const tags = (req.query.tags?.split(",") || []).map((tag) => tag.trim());

  if (tags.length === 0) {
    return res.status(400).json({ error: "No tags provided" });
  }

  const placeholders = tags.map(() => "?").join(",");

  const sql = `
    SELECT DISTINCT r.recipe_id, r.name, r.instruction
    FROM recipes r
    JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE i.name IN (${placeholders})
  `;

  try {
    const [results] = await db.promise().query(sql, tags);
    res.json(results);
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
