# CSV Validator — Sistema de Carga y Validación de Datos

Sistema full stack para la carga, validación y corrección de archivos CSV con autenticación basada en JWT.

---

## 🛠️ Tecnologías

### Backend
- Node.js + Express
- PostgreSQL
- JWT + Cookies httpOnly
- Vitest + Supertest

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Vitest + React Testing Library

---

## 📁 Estructura del proyecto

```
csv-validator/
├── backend/
│   ├── src/
│   │   ├── config/       # Conexión a la DB
│   │   ├── middleware/   # Autenticación
│   │   ├── routes/       # Endpoints
│   │   └── services/     # Lógica de negocio
│   ├── migrations/       # Creación de tablas
│   ├── seeds/            # Usuario admin inicial
│   └── tests/            # Tests del backend
└── frontend/
    └── src/
        ├── components/   # Componentes reutilizables
        ├── pages/        # Login y Upload
        ├── services/     # Llamadas al backend
        └── tests/        # Tests del frontend
```

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- PostgreSQL v14 o superior
- npm v9 o superior

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone git@github.com:carlaclefig/csv-validator.git
cd csv-validator
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea el archivo `backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=csv_upload
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgres
JWT_SECRET=tu_secreto_seguro
```

### 3. Configurar la Base de Datos

Abre pgAdmin y crea una base de datos llamada `csv_upload`.

Luego ejecuta la migración y el seed:

```bash
npm run db:migrate
npm run db:seed
```

Esto creará la tabla `users` e insertará el usuario admin.

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Ejecutar la aplicación

### Backend

```bash
cd backend
npm run dev
```

El servidor correrá en `http://localhost:3000`

### Frontend

```bash
cd frontend
npm run dev
```

El frontend correrá en `http://localhost:5173`

---

## 🔑 Credenciales de acceso

| Campo | Valor |
|-------|-------|
| Email | admin@example.com |
| Password | Admin@2026! |

---

## 🧪 Ejecutar tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

---

## 📡 Endpoints del API

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/login` | Autenticación de usuario | No |
| POST | `/api/upload` | Carga y validación de CSV | Admin |
| POST | `/api/upload/retry` | Reenvío de registros corregidos | Admin |
| POST | `/api/logout` | Cierre de sesión | No |

---

## 📋 Formato del CSV

El archivo CSV debe tener exactamente estas columnas:

```csv
name,email,age
Juan Perez,juan.perez@example.com,28
Maria Lopez,maria.lopez@example.com,35
```

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| name | string | ✅ Sí | No puede estar vacío |
| email | string | ✅ Sí | Formato válido de email |
| age | integer | ❌ No | Número entero entre 1 y 98 |


---

## 👩‍💻 Autora

Carla — [github.com/carlaclefig](https://github.com/carlaclefig)