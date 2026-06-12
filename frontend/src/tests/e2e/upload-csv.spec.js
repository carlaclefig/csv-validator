import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe("Upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "Admin@2026!");
    await page.click('button:has-text("Ingresar")');
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("botón Upload File deshabilitado sin archivo", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /upload file/i }),
    ).toBeDisabled();
  });

  test("sube archivo CSV y muestra dashboard", async ({ page }) => {
    const filePath = path.join(__dirname, "files/users.csv");
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click('button:has-text("Upload File")');
    await expect(page.getByText(/registros procesados/i)).toBeVisible();
  });

  test("muestra sección de errores después de subir CSV", async ({ page }) => {
    const filePath = path.join(__dirname, "files/users.csv");
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click('button:has-text("Upload File")');
    await expect(
      page.getByText(/corrige los registros con errores/i),
    ).toBeVisible();
  });

  test("logout redirige a login", async ({ page }) => {
    await page.click('button:has-text("Salir")');
    await expect(page).toHaveURL("http://localhost:5173/login");
  });
});
