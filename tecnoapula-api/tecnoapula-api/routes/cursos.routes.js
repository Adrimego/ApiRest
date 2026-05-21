// routes/cursos.routes.js
// Definición de las rutas de la API para los cursos de TecnoAula Formación

const express = require("express");
const router = express.Router();
const {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} = require("../controllers/cursos.controller");

// GET    /api/cursos           → Obtener todos los cursos (acepta ?nombre= y ?nivel=)
// GET    /api/cursos/:id       → Obtener un curso por ID
// POST   /api/cursos           → Crear un nuevo curso
// PUT    /api/cursos/:id       → Actualizar un curso existente
// DELETE /api/cursos/:id       → Eliminar un curso

router.get("/", obtenerCursos);
router.get("/:id", obtenerCursoPorId);
router.post("/", crearCurso);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCurso);

module.exports = router;
