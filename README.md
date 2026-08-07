# API de Libros - Proyecto Express y PostgreSQL 📚🚀

Este proyecto es una API REST creada con Node.js, Express y PostgreSQL. 🛠️

## Requisitos Previos 📋

* Node.js (v18+) 🟢
* pnpm ⚡
* PostgreSQL 🐘

## Instalación ⚙️

1. Clona el repositorio. 📥
2. Instala las dependencias: `pnpm install` 📦
3. Copia el archivo `.env.example` y renómbralo a `.env`: `cp .env.example .env` 📄
4. Configura tus credenciales de PostgreSQL en el archivo `.env`. 🔑

## Configuración de la Base de Datos 🗄️

Ejecuta el script SQL que se encuentra en `database/init.sql` en tu servidor PostgreSQL para crear la tabla `books`. 🛠️

## Ejecución 🏃‍♂️

1. Inicia el servidor localmente:
   `pnpm start` ▶️
2. La API estará disponible en `http://localhost:3000`. 🌐

## Endpoints 🔌

* `GET /health`: Verifica el estado de la API y la conexión a la base de datos. 🩺
* `GET /books`: Obtiene todos los libros ordenados por fecha de creación (más reciente primero). 📖
* `POST /books`: Crea un nuevo libro. Parámetros en JSON: `{ "title": "...", "author": "...", "published_year": 2024 }` ✍️

## Documentación y Plan de Respaldos 💾

El proyecto cuenta con un archivo detallado con la estrategia de backups, puedes encontrarlo en `backup_plan.md`. 📑

## Despliegue (CI/CD) 🚢

El repositorio incluye un pipeline de GitHub Actions (`.github/workflows/ci.yml`) que se ejecuta en cada push a la rama `main` validando la instalación y sintaxis del código de forma continua. 🤖 Para el despliegue a producción, conecta este repositorio de GitHub a tu cuenta de Render, Railway o plataforma preferida. ☁️

## Integrantes del Equipo 👥

* Ing. Humberto Batres 👨‍💻
* Lic. Roberto García 👨‍💼
