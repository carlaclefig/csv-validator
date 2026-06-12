import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("muestra error con credenciales incorrectas", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "malo@example.com");
    await page.fill('input[name="password"]', "passwordmal");
    await page.click('button:has-text("Ingresar")');
    await expect(page.getByText("Credenciales inválidas")).toBeVisible();
  });

  test("login exitoso redirige a /", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "Admin@2026!");
    await page.click('button:has-text("Ingresar")');
    await expect(page).toHaveURL("http://localhost:5173/");
  });
});
