import { pool } from "../src/config/db.js";

export async function up() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id       SERIAL PRIMARY KEY,
      name     VARCHAR(255) NOT NULL,
      email    VARCHAR(255) NOT NULL UNIQUE,
      age INTEGER CHECK (age > 0 AND age < 99),
      role     VARCHAR(10) NOT NULL DEFAULT 'user'
                 CHECK (role IN ('user', 'admin')),
      password VARCHAR(255)
    );
  `);
  console.log("✅ Tabla users creada");
}
