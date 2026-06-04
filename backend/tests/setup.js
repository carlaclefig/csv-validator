import { pool } from "../src/config/db.js";

afterAll(async () => {
  await pool.query("DELETE FROM users WHERE role = 'user'");
  await pool.end();
});
