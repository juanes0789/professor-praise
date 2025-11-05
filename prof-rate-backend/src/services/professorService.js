import { pool } from "../db/index.js";

export async function getTopProfessors(limit = 3) {
  const result = await pool.query(`
    SELECT p.*, COALESCE(AVG(r.score), 0) as avg_score
    FROM professors p
    LEFT JOIN ratings r ON r.professor_id = p.id
    GROUP BY p.id
    ORDER BY avg_score DESC
    LIMIT $1;
  `, [limit]);
  return result.rows;
}