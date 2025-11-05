import dotenv from "dotenv";
import pkg from "pg";

dotenv.config({ path: "./.env" }); // fuerza la carga del archivo .env

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function testConnection() {
  console.log("🔍 Probando conexión con la base de datos...");

  console.log({
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_PASS: process.env.DB_PASS ? "********" : "(VACÍA ⚠️)",
  });

  try {
    const result = await pool.query("SELECT NOW() AS fecha_actual;");
    console.log("✅ Conexión exitosa a PostgreSQL.");
    console.log("🕒 Fecha actual en el servidor:", result.rows[0].fecha_actual);
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();