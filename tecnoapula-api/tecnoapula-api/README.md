# TecnoAula Formación — API REST

API REST desarrollada con **Node.js** y **Express** para gestionar cursos formativos de la empresa ficticia TecnoAula Formación.

---

## Estructura del proyecto

```
tecnoapula-api/
├── .env                          # Variables de entorno
├── package.json                  # Dependencias y scripts
├── server.js                     # Servidor principal
├── routes/
│   └── cursos.routes.js          # Definición de rutas
├── controllers/
│   └── cursos.controller.js      # Lógica de negocio
└── data/
    └── cursos.js                 # Datos iniciales en memoria
```

---

## Instalación y puesta en marcha

```bash
# 1. Instalar las dependencias
npm install

# 2. Arrancar el servidor (producción)
npm start

# 3. Arrancar el servidor con recarga automática (desarrollo)
npm run dev
```

El servidor arrancará en **http://localhost:3000**

---

## Endpoints disponibles

| Método   | Ruta                  | Descripción                                |
|----------|-----------------------|--------------------------------------------|
| GET      | `/`                   | Comprobar que la API funciona              |
| GET      | `/api/cursos`         | Obtener todos los cursos                   |
| GET      | `/api/cursos/:id`     | Obtener un curso por ID                    |
| POST     | `/api/cursos`         | Crear un nuevo curso                       |
| PUT      | `/api/cursos/:id`     | Modificar un curso existente               |
| DELETE   | `/api/cursos/:id`     | Eliminar un curso                          |

### Filtros opcionales (query params)

| Parámetro | Descripción                             | Ejemplo                          |
|-----------|-----------------------------------------|----------------------------------|
| `nombre`  | Buscar cursos por nombre (parcial)      | `/api/cursos?nombre=web`         |
| `nivel`   | Filtrar por nivel                       | `/api/cursos?nivel=Intermedio`   |

Los niveles válidos son: `Inicial`, `Intermedio`, `Avanzado`.

---

## Formato de un curso

```json
{
  "id": 1,
  "nombre": "Informática básica",
  "descripcion": "Curso de iniciación al uso del ordenador e Internet",
  "duracion": "30 horas",
  "nivel": "Inicial",
  "precio": 120
}
```

---

## Ejemplos de uso con Postman / Thunder Client

### GET — Obtener todos los cursos
```
GET http://localhost:3000/api/cursos
```

### GET — Filtrar por nivel
```
GET http://localhost:3000/api/cursos?nivel=Intermedio
```

### GET — Buscar por nombre
```
GET http://localhost:3000/api/cursos?nombre=react
```

### GET — Obtener un curso por ID
```
GET http://localhost:3000/api/cursos/1
```

### POST — Crear un nuevo curso
```
POST http://localhost:3000/api/cursos
Content-Type: application/json

{
  "nombre": "Curso de redes básicas",
  "descripcion": "Introducción a redes, IP, routers y configuración básica",
  "duracion": "40 horas",
  "nivel": "Intermedio",
  "precio": 180
}
```

### PUT — Actualizar un curso
```
PUT http://localhost:3000/api/cursos/1
Content-Type: application/json

{
  "precio": 135,
  "nivel": "Intermedio"
}
```

### DELETE — Eliminar un curso
```
DELETE http://localhost:3000/api/cursos/1
```

---

## Funcionalidades implementadas

### Obligatorias
- [x] Servidor Express en puerto 3000
- [x] `GET /api/cursos` — Listar todos los cursos
- [x] `GET /api/cursos/:id` — Obtener curso por ID
- [x] `POST /api/cursos` — Crear curso con validación de campos obligatorios
- [x] `PUT /api/cursos/:id` — Actualizar curso (actualización parcial)
- [x] `DELETE /api/cursos/:id` — Eliminar curso
- [x] Respuestas en formato JSON
- [x] Control de errores (404, 400, 500)
- [x] Rutas separadas en archivo independiente (`routes/`)
- [x] Lógica en controladores (`controllers/`)
- [x] Datos iniciales en archivo propio (`data/`)

### Opcionales implementadas
- [x] Buscador de cursos por nombre (`?nombre=`)
- [x] Filtro por nivel (`?nivel=`)
- [x] Validación completa de datos (campos, niveles válidos, precio)
- [x] Variables de entorno con `.env`
- [x] CORS habilitado para conexión desde React
- [x] Documentación de la API (este README)

---

## Tecnologías utilizadas

- **Node.js** — Entorno de ejecución
- **Express** — Framework web
- **cors** — Middleware CORS
- **dotenv** — Variables de entorno
- **nodemon** — Recarga automática en desarrollo
