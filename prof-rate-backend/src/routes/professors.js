import express from "express";
import { pool } from "../db/index.js";
export const router = express.Router();

// Obtener todos los profesores con promedio
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT p.*, COALESCE(AVG(r.score), 0) as avg_score
    FROM professors p
    LEFT JOIN ratings r ON r.professor_id = p.id
    GROUP BY p.id
    ORDER BY avg_score DESC;
  `);
  res.json(result.rows);
});

// Obtener un profesor y sus comentarios
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const prof = await pool.query("SELECT * FROM professors WHERE id=$1", [id]);
  const comments = await pool.query(
    "SELECT * FROM comments WHERE professor_id=$1 ORDER BY created_at DESC",
    [id]
  );
  res.json({ professor: prof.rows[0], comments: comments.rows });
});