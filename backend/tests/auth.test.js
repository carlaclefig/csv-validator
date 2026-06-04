import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("POST /api/login", () => {
  it("retorna ok:true con credenciales correctas", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@example.com", password: "Admin@2026!" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.role).toBe("admin");
  });

  it("retorna ok:false con password incorrecto", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "admin@example.com", password: "passwordmal" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("Credenciales inválidas");
  });

  it("retorna ok:false con email inexistente", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "noexiste@example.com", password: "Admin@2026!" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("Credenciales inválidas");
  });
});
