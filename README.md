# MiniBlog API

API REST para gestionar autores y posts de un blog. Permite realizar operaciones CRUD sobre autores y publicaciones, usando una base de datos PostgreSQL con relacion entre ambas entidades.

Proyecto construido con Node.js, Express y PostgreSQL. Incluye validaciones reutilizables, manejo centralizado de errores, tests automatizados y documentacion interactiva con OpenAPI/Swagger.

## URL Base

```txt
https://miniblog-api-production-10c8.up.railway.app
```

## Documentacion interactiva

La documentacion completa de la API esta disponible en Swagger UI:

```txt
https://miniblog-api-production-10c8.up.railway.app/api-docs
```

Desde ahi se pueden ver todos los endpoints, sus parametros, ejemplos de request y respuestas posibles.

## Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* pg
* OpenAPI
* Swagger UI
* Vitest
* Supertest
* Railway

## Endpoints disponibles

### Estado de la API

| Metodo | Ruta      | Descripcion                          |
| ------ | --------- | ------------------------------------ |
| GET    | `/health` | Verifica que la API este funcionando |

### Autores

| Metodo | Ruta           | Descripcion                   |
| ------ | -------------- | ----------------------------- |
| GET    | `/authors`     | Obtener todos los autores     |
| GET    | `/authors/:id` | Obtener un autor por ID       |
| POST   | `/authors`     | Crear un nuevo autor          |
| PUT    | `/authors/:id` | Actualizar un autor existente |
| DELETE | `/authors/:id` | Eliminar un autor             |

### Posts

| Metodo | Ruta                      | Descripcion                         |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/posts`                  | Obtener todos los posts             |
| GET    | `/posts/:id`              | Obtener un post por ID              |
| GET    | `/posts/author/:authorId` | Obtener todos los posts de un autor |
| POST   | `/posts`                  | Crear un nuevo post                 |
| PUT    | `/posts/:id`              | Actualizar un post existente        |
| DELETE | `/posts/:id`              | Eliminar un post                    |

## Ejemplos de uso

### Obtener estado de la API

```bash
curl https://miniblog-api-production-10c8.up.railway.app/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "timestamp": "2026-06-16T00:00:00.000Z",
  "uptime": 123.45
}
```

### Obtener todos los autores

```bash
curl https://miniblog-api-production-10c8.up.railway.app/authors
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "name": "Alexelcapo",
    "email": "alexelcapo@gmail.com",
    "bio": "Critico y amante de videojuegos",
    "created_at": "2026-06-16T18:03:40.819Z"
  },
  {
    "id": 2,
    "name": "Anton Ego",
    "email": "anton@gmail.com",
    "bio": "Critico de comida",
    "created_at": "2026-06-16T18:03:40.819Z"
  },
  {
    "id": 3,
    "name": "Miranda Priestly",
    "email": "mirandapriestly@gmail.com",
    "bio": "Editora y critica de tendencias culturales globales",
    "created_at": "2026-06-16T18:03:40.819Z"
  }
]
```

### Obtener un autor por ID

```bash
curl https://miniblog-api-production-10c8.up.railway.app/authors/1
```

Respuesta esperada:

```json
{
  "id": 1,
  "name": "Alexelcapo",
  "email": "alexelcapo@gmail.com",
  "bio": "Critico y amante de videojuegos",
  "created_at": "2026-06-16T18:03:40.819Z"
}
```

### Crear un autor

```bash
curl -X POST https://miniblog-api-production-10c8.up.railway.app/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Autor Nuevo",
    "email": "autor.nuevo@example.com",
    "bio": "Biografia del autor"
  }'
```

Respuesta esperada:

```json
{
  "id": 4,
  "name": "Autor Nuevo",
  "email": "autor.nuevo@example.com",
  "bio": "Biografia del autor",
  "created_at": "2026-06-16T00:00:00.000Z"
}
```

### Obtener todos los posts

```bash
curl https://miniblog-api-production-10c8.up.railway.app/posts
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "author_id": 1,
    "title": "Por que los videojuegos son arte",
    "content": "Un analisis profundo sobre las narrativas interactivas en la actualidad...",
    "published": true,
    "created_at": "2026-06-16T18:03:41.057Z"
  },
  {
    "id": 2,
    "author_id": 1,
    "title": "Mi opinion sincera sobre el nuevo GOTY",
    "content": "Contenido del post analizando el juego del ano paso a paso...",
    "published": false,
    "created_at": "2026-06-16T18:03:41.057Z"
  },
  {
    "id": 3,
    "author_id": 2,
    "title": "La perspectiva de un critico gastronomico",
    "content": "El trabajo de un critico es sencillo en muchos aspectos. Arriesgamos poco...",
    "published": true,
    "created_at": "2026-06-16T18:03:41.057Z"
  }
]
```

### Obtener posts de un autor

```bash
curl https://miniblog-api-production-10c8.up.railway.app/posts/author/1
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "author_id": 1,
    "title": "Por que los videojuegos son arte",
    "content": "Un analisis profundo sobre las narrativas interactivas en la actualidad...",
    "published": true,
    "created_at": "2026-06-16T18:03:41.057Z"
  },
  {
    "id": 2,
    "author_id": 1,
    "title": "Mi opinion sincera sobre el nuevo GOTY",
    "content": "Contenido del post analizando el juego del ano paso a paso...",
    "published": false,
    "created_at": "2026-06-16T18:03:41.057Z"
  }
]
```

### Crear un post

```bash
curl -X POST https://miniblog-api-production-10c8.up.railway.app/posts \
  -H "Content-Type: application/json" \
  -d '{
    "author_id": 1,
    "title": "Post creado desde curl",
    "content": "Contenido del post de prueba",
    "published": true
  }'
```

Respuesta esperada:

```json
{
  "id": 4,
  "author_id": 1,
  "title": "Post creado desde curl",
  "content": "Contenido del post de prueba",
  "published": true,
  "created_at": "2026-06-16T00:00:00.000Z"
}
```

### Eliminar recursos

Para eliminar un autor:

```bash
curl -X DELETE https://miniblog-api-production-10c8.up.railway.app/authors/4
```

Para eliminar un post:

```bash
curl -X DELETE https://miniblog-api-production-10c8.up.railway.app/posts/4
```

Respuesta esperada:

```txt
Status 204 No Content
```

## Validaciones principales

### Autores

Campos requeridos:

```json
{
  "name": "string",
  "email": "string"
}
```

Campo opcional:

```json
{
  "bio": "string"
}
```

Reglas principales:

* `name` es obligatorio.
* `email` es obligatorio.
* `email` debe tener formato valido.
* `email` no puede repetirse.
* `bio` es opcional.

### Posts

Campos requeridos:

```json
{
  "author_id": 1,
  "title": "string",
  "content": "string"
}
```

Campo opcional:

```json
{
  "published": true
}
```

Reglas principales:

* `author_id` es obligatorio.
* `author_id` debe ser un numero entero positivo.
* `author_id` debe existir en la tabla de autores.
* `title` es obligatorio.
* `content` es obligatorio.
* `published` debe ser `true` o `false`.
* Si `published` no se envia, toma el valor `false`.

## Manejo de errores

La API devuelve errores en formato JSON.

Ejemplo:

```json
{
  "error": "Autor no encontrado"
}
```

Algunos codigos utilizados:

| Codigo | Significado                |
| ------ | -------------------------- |
| 400    | Datos invalidos            |
| 404    | Recurso no encontrado      |
| 500    | Error interno del servidor |

## Ejecutar el proyecto localmente

### Requisitos previos

* Node.js
* npm
* PostgreSQL

### Clonar el repositorio

```bash
git clone https://github.com/Leonelbruno/miniblog-api.git
cd miniblog-api
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password
```

### Crear y cargar la base de datos local

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE miniblog;
```

Ejecutar los scripts SQL:

```bash
psql -U postgres -d miniblog -f sql/setup.sql
psql -U postgres -d miniblog -f sql/seed.sql
```

### Iniciar el servidor

```bash
npm run dev
```

La API estara disponible en:

```txt
http://localhost:3000
```

La documentacion Swagger estara disponible en:

```txt
http://localhost:3000/api-docs
```

## Scripts disponibles

```bash
npm start
```

Inicia la aplicacion en modo produccion.

```bash
npm run dev
```

Inicia la aplicacion en modo desarrollo con nodemon.

```bash
npm test
```

Ejecuta los tests automatizados.

```bash
npm run test:watch
```

Ejecuta los tests en modo observacion.

```bash
npm run test:coverage
```

Ejecuta los tests con reporte de cobertura.

## Tests

El proyecto incluye tests con Vitest y Supertest para verificar:

* Estado general de la API.
* Endpoints de lectura.
* CRUD de autores.
* CRUD de posts.
* Validadores de autores.
* Validadores de posts.
* Manejo de rutas inexistentes.

Para ejecutar los tests:

```bash
npm test
```

## Deployment

El proyecto esta desplegado en Railway.

Servicios utilizados:

* Railway App Service para la API Express.
* Railway PostgreSQL para la base de datos.

Variables de entorno usadas en produccion:

```env
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

## Estructura general del proyecto

```txt
miniblog-api/
├── config/
├── sql/
│   ├── setup.sql
│   └── seed.sql
├── src/
│   ├── app.js
│   ├── server.js
│   ├── db/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validators/
├── tests/
├── openapi.yaml
├── package.json
├── package-lock.json
├── README.md
└── vitest.config.mjs
```

## Autor

Proyecto desarrollado por Leonel Bruno Vera como parte del modulo 2 de SoyHenry.
