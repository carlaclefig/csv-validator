import { pool } from "../src/config/db.js";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  const password = await bcrypt.hash("Admin@2026!", 10);

  await pool.query(
    `
    INSERT INTO users (name, email, age, role, password)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO NOTHING
  `,
    ["Admin User", "admin@example.com", 30, "admin", password],
  );

  console.log("✅ Admin creado: admin@example.com / Admin@2026!");
}
