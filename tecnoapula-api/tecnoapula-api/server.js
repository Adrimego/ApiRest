// server.js
// Servidor principal de la API REST de TecnoAula Formación

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cursosRoutes = require("./routes/cursos.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ───────────────────────────────────────────────
// Permite parsear el body de las peticiones en formato JSON
app.use(express.json());

// Habilita CORS para permitir conexiones desde aplicaciones externas (ej: React)
app.use(cors());

// ─── Ruta principal ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API de TecnoAula Formación funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      "GET    /api/cursos":        "Obtener todos los cursos (filtros: ?nombre= &nivel=)",
      "GET    /api/cursos/:id":    "Obtener un curso por ID",
      "POST   /api/cursos":        "Crear un nuevo curso",
      "PUT    /api/cursos/:id":    "Actualizar un curso existente",
      "DELETE /api/cursos/:id":    "Eliminar un curso",
    },
  });
});

// ─── Rutas de la API ───────────────────────────────────────────
app.use("/api/cursos", cursosRoutes);

// ─── Ruta no encontrada (404) ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: `Ruta ${req.method} ${req.path} no encontrada.`,
  });
});

// ─── Manejador global de errores ───────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error interno:", err.message);
  res.status(500).json({
    ok: false,
    mensaje: "Error interno del servidor.",
    error: err.message,
  });
});

// ─── Arranque del servidor ─────────────────────────────────────
app.listen(PORT, () => {
  console.log("─────────────────────────────────────────────");
  console.log("  TecnoAula Formación - API REST");
  console.log(`  Servidor escuchando en http://localhost:${PORT}`);
  console.log("─────────────────────────────────────────────");
});
