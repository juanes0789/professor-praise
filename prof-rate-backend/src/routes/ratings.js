import express from "express";
import { pool } from "../db/index.js";
export const router = express.Router();

// Calificar un profesor (anonimamente)
router.post("/", async (req, res) => {
  const { professor_id, score, comment } = req.body;
  try {
    await pool.query("INSERT INTO ratings (professor_id, score) VALUES ($1, $2)", [
      professor_id,
      score,
    ]);
    if (comment) {
      await pool.query(
        "INSERT INTO comments (professor_id, comment) VALUES ($1, $2)",
        [professor_id, comment]
      );
    }
    res.json({ message: "✅ Calificación registrada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener calificaciones
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM ratings ORDER BY created_at DESC");
  res.json(result.rows);
});