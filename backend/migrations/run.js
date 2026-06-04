import { up } from "./create_users.js";
import { pool } from "../src/config/db.js";

try {
  await up();
} finally {
  await pool.end();
}
