// controllers/cursos.controller.js
// Controlador con la lógica de negocio para gestionar los cursos de TecnoAula Formación

const cursos = require("../data/cursos");

// Contador para generar IDs únicos incrementales
let nextId = cursos.length + 1;

// ─────────────────────────────────────────────
// GET /api/cursos
// Obtiene todos los cursos (con filtros opcionales)
// Query params opcionales: nombre, nivel
// ─────────────────────────────────────────────
const obtenerCursos = (req, res) => {
  const { nombre, nivel } = req.query;
  let resultado = [...cursos];

  // Filtro opcional por nombre (búsqueda parcial, sin distinción de mayúsculas)
  if (nombre) {
    resultado = resultado.filter((c) =>
      c.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  // Filtro opcional por nivel (Inicial, Intermedio, Avanzado)
  if (nivel) {
    resultado = resultado.filter(
      (c) => c.nivel.toLowerCase() === nivel.toLowerCase()
    );
  }

  return res.status(200).json({
    ok: true,
    total: resultado.length,
    cursos: resultado,
  });
};

// ─────────────────────────────────────────────
// GET /api/cursos/:id
// Obtiene un curso concreto por su ID
// ─────────────────────────────────────────────
const obtenerCursoPorId = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido." });
  }

  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return res
      .status(404)
      .json({ ok: false, mensaje: `No se encontró ningún curso con el ID ${id}.` });
  }

  return res.status(200).json({ ok: true, curso });
};

// ─────────────────────────────────────────────
// POST /api/cursos
// Crea un nuevo curso
// ─────────────────────────────────────────────
const crearCurso = (req, res) => {
  const { nombre, descripcion, duracion, nivel, precio } = req.body;

  // Validación de campos obligatorios
  const camposFaltantes = [];
  if (!nombre) camposFaltantes.push("nombre");
  if (!descripcion) camposFaltantes.push("descripcion");
  if (!duracion) camposFaltantes.push("duracion");

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      mensaje: `Faltan campos obligatorios: ${camposFaltantes.join(", ")}.`,
    });
  }

  // Validación del nivel si se proporciona
  const nivelesValidos = ["Inicial", "Intermedio", "Avanzado"];
  if (nivel && !nivelesValidos.includes(nivel)) {
    return res.status(400).json({
      ok: false,
      mensaje: `El nivel debe ser uno de los siguientes: ${nivelesValidos.join(", ")}.`,
    });
  }

  // Validación del precio si se proporciona
  if (precio !== undefined && (isNaN(precio) || precio < 0)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El precio debe ser un número positivo.",
    });
  }

  const nuevoCurso = {
    id: nextId++,
    nombre,
    descripcion,
    duracion,
    nivel: nivel || "Inicial",
    precio: precio !== undefined ? Number(precio) : 0,
  };

  cursos.push(nuevoCurso);

  return res.status(201).json({
    ok: true,
    mensaje: "Curso creado correctamente.",
    curso: nuevoCurso,
  });
};

// ─────────────────────────────────────────────
// PUT /api/cursos/:id
// Actualiza un curso existente
// ─────────────────────────────────────────────
const actualizarCurso = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido." });
  }

  const index = cursos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ ok: false, mensaje: `No se encontró ningún curso con el ID ${id}.` });
  }

  const { nombre, descripcion, duracion, nivel, precio } = req.body;

  // Validación del nivel si se envía
  const nivelesValidos = ["Inicial", "Intermedio", "Avanzado"];
  if (nivel && !nivelesValidos.includes(nivel)) {
    return res.status(400).json({
      ok: false,
      mensaje: `El nivel debe ser uno de los siguientes: ${nivelesValidos.join(", ")}.`,
    });
  }

  // Validación del precio si se envía
  if (precio !== undefined && (isNaN(precio) || precio < 0)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El precio debe ser un número positivo.",
    });
  }

  // Se actualiza solo lo que se envíe (actualización parcial)
  const cursoActualizado = {
    ...cursos[index],
    ...(nombre && { nombre }),
    ...(descripcion && { descripcion }),
    ...(duracion && { duracion }),
    ...(nivel && { nivel }),
    ...(precio !== undefined && { precio: Number(precio) }),
  };

  cursos[index] = cursoActualizado;

  return res.status(200).json({
    ok: true,
    mensaje: "Curso actualizado correctamente.",
    curso: cursoActualizado,
  });
};

// ─────────────────────────────────────────────
// DELETE /api/cursos/:id
// Elimina un curso por su ID
// ─────────────────────────────────────────────
const eliminarCurso = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido." });
  }

  const index = cursos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ ok: false, mensaje: `No se encontró ningún curso con el ID ${id}.` });
  }

  const cursoEliminado = cursos.splice(index, 1)[0];

  return res.status(200).json({
    ok: true,
    mensaje: `Curso "${cursoEliminado.nombre}" eliminado correctamente.`,
    curso: cursoEliminado,
  });
};

module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
};
