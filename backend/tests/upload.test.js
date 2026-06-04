import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../src/index.js";

let cookie = "";

// Hacer login antes de los tests
beforeAll(async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ email: "admin@example.com", password: "Admin@2026!" });

  cookie = res.headers["set-cookie"]?.[0] ?? "";
});

describe("POST /api/upload", () => {
  it("retorna 401 sin token", async () => {
    const res = await request(app).post("/api/upload");

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  it("retorna 400 sin archivo", async () => {
    const res = await request(app).post("/api/upload").set("Cookie", cookie);

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("No se proporcionó ningún archivo");
  });

  it("procesa CSV con filas válidas e inválidas", async () => {
    const csvContent = [
      "name,email,age",
      "Test User,test.upload@example.com,30",
      ",correomal,0",
    ].join("\n");

    const res = await request(app)
      .post("/api/upload")
      .set("Cookie", cookie)
      .attach("file", Buffer.from(csvContent), {
        filename: "test.csv",
        contentType: "text/csv",
      });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.success.length).toBeGreaterThan(0);
    expect(res.body.data.errors.length).toBeGreaterThan(0);
  });

  it("retorna error si el archivo no es CSV", async () => {
    const res = await request(app)
      .post("/api/upload")
      .set("Cookie", cookie)
      .attach("file", Buffer.from("contenido"), {
        filename: "test.txt",
        contentType: "text/plain",
      });

    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });
});
