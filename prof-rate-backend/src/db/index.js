import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

console.log("🔍 Variables cargadas:");
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS ? "*****" : "(VACÍA ⚠️)",
  port: process.env.DB_PORT,
});

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});