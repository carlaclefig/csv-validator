import { describe, it, expect } from "vitest";

// Extraemos validateRow para testearla directamente
// como es una función interna la copiamos aquí
function validateRow(row) {
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

describe("validateRow", () => {
  it("no retorna errores para una fila válida", () => {
    const row = { name: "Juan Perez", email: "juan@example.com", age: "28" };
    const errors = validateRow(row);
    expect(errors).toEqual({});
  });

  it("no retorna errores si age está vacío (es opcional)", () => {
    const row = { name: "Juan Perez", email: "juan@example.com", age: "" };
    const errors = validateRow(row);
    expect(errors).toEqual({});
  });

  it("retorna error si name está vacío", () => {
    const row = { name: "", email: "juan@example.com", age: "28" };
    const errors = validateRow(row);
    expect(errors.name).toBe("El campo 'name' no puede estar vacío");
  });

  it("retorna error si email está vacío", () => {
    const row = { name: "Juan", email: "", age: "28" };
    const errors = validateRow(row);
    expect(errors.email).toBe("El campo 'email' no puede estar vacío");
  });

  it("retorna error si email tiene formato inválido", () => {
    const row = { name: "Juan", email: "correomal", age: "28" };
    const errors = validateRow(row);
    expect(errors.email).toBe("El formato del campo 'email' es inválido");
  });

  it("retorna error si age es 0", () => {
    const row = { name: "Juan", email: "juan@example.com", age: "0" };
    const errors = validateRow(row);
    expect(errors.age).toBe("El campo 'age' debe ser un número entero");
  });

  it("retorna error si age es negativo", () => {
    const row = { name: "Juan", email: "juan@example.com", age: "-5" };
    const errors = validateRow(row);
    expect(errors.age).toBe("El campo 'age' debe ser un número entero");
  });

  it("retorna error si age es 99 o mayor", () => {
    const row = { name: "Juan", email: "juan@example.com", age: "99" };
    const errors = validateRow(row);
    expect(errors.age).toBe("El campo 'age' debe ser un número entero");
  });

  it("retorna error si age no es número", () => {
    const row = { name: "Juan", email: "juan@example.com", age: "25s" };
    const errors = validateRow(row);
    expect(errors.age).toBe("El campo 'age' debe ser un número entero");
  });

  it("retorna múltiples errores en una fila con varios campos inválidos", () => {
    const row = { name: "", email: "correomal", age: "0" };
    const errors = validateRow(row);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.age).toBeDefined();
  });
});
