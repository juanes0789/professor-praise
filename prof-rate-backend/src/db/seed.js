import { pool } from "./index.js";

async function seed() {
  console.log("🚀 Iniciando creación de tablas...");

  // Borrar tablas previas (si existen)
  await pool.query(`
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS ratings;
    DROP TABLE IF EXISTS professors;
  `);

  // Crear tabla de profesores
  await pool.query(`
    CREATE TABLE professors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      subject VARCHAR(100),
      faculty VARCHAR(100),
      university VARCHAR(100)
    );
  `);

  // Crear tabla de calificaciones
  await pool.query(`
    CREATE TABLE ratings (
      id SERIAL PRIMARY KEY,
      professor_id INT REFERENCES professors(id) ON DELETE CASCADE,
      score INT CHECK (score BETWEEN 1 AND 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Crear tabla de comentarios
  await pool.query(`
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      professor_id INT REFERENCES professors(id) ON DELETE CASCADE,
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ Tablas creadas correctamente");

  // Insertar datos iniciales
  const professors = [
    ["Juan Pérez", "Matemáticas","Ingenieria", "UdeA"],
    ["María Gómez", "Física",'Educacion', "EAFIT"],
    ["Carlos Ruiz", "Programación", 'Ingenieria', "UdeA"],
  ];

  for (const [name, subject, faculty, university] of professors) {
    await pool.query(
      "INSERT INTO professors (name, subject,faculty, university) VALUES ($1, $2, $3, $4)",
      [name, subject, faculty, university]
    );
  }

  console.log("🌱 Datos iniciales insertados correctamente");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error ejecutando el seeder:", err);
  process.exit(1);
});