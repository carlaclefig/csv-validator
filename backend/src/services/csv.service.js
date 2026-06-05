import { parse } from "csv-parse";
import { pool } from "../config/db.js";

function validateRow(row, index) {
  const errors = {};

  if (!row.name || row.name.trim() === "") {
    errors.name = "El campo 'name' no puede estar vacío";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!row.email || row.email.trim() === "") {
    errors.email = "El campo 'email' no puede estar vacío";
  } else if (!emailRegex.test(row.email.trim())) {
    errors.email = "El formato del campo 'email' es inválido";
  }

  if (row.age !== undefined && row.age !== "") {
    const age = Number(row.age);
    if (isNaN(age) || !Number.isInteger(age) || age <= 0 || age >= 99) {
      errors.age = "El campo 'age' debe ser un número entero";
    }
  }

  return errors;
}

function parseCSV(buffer) {
  return new Promise((resolve, reject) => {
    parse(
      buffer,
      {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      },
      (err, records) => {
        if (err) reject(err);
        else resolve(records);
      },
    );
  });
}

export async function processCSV(fileBuffer) {
  const records = await parseCSV(fileBuffer);
  const success = [];
  const errors = [];

  for (let i = 0; i < records.length; i++) {
    const row = records[i];

    if (!row.name && !row.email && !row.age) continue;

    const rowErrors = validateRow(row, i);

    if (Object.keys(rowErrors).length > 0) {
      errors.push({
        row: i + 2,
        data: row,
        details: rowErrors,
      });
    } else {
      const result = await pool.query(
        `INSERT INTO users (name, email, age, role)
         VALUES ($1, $2, $3, 'user')
         ON CONFLICT (email) DO NOTHING
         RETURNING *`,
        [row.name.trim(), row.email.trim(), row.age ? Number(row.age) : null],
      );

      if (result.rows[0]) {
        const { password, ...user } = result.rows[0];
        success.push(user);
      }
    }
  }

  return { success, errors };
}

export async function retryRecords(records) {
  const success = [];
  const errors = [];

  for (let i = 0; i < records.length; i++) {
    const { row, data } = records[i];
    const rowErrors = validateRow(data);

    if (Object.keys(rowErrors).length > 0) {
      errors.push({ row, data, details: rowErrors });
    } else {
      const result = await pool.query(
        `INSERT INTO users (name, email, age, role)
         VALUES ($1, $2, $3, 'user')
         ON CONFLICT (email) DO NOTHING
         RETURNING *`,
        [
          data.name.trim(),
          data.email.trim(),
          data.age ? Number(data.age) : null,
        ],
      );

      if (result.rows[0]) {
        const { password, ...user } = result.rows[0];
        success.push(user);
      }
    }
  }

  return { success, errors };
}
