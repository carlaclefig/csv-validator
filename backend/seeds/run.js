import { seedAdmin } from "./admin.js";
import { pool } from "../src/config/db.js";

try {
  await seedAdmin();
} finally {
  await pool.end();
}
