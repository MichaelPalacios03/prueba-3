# Examen 2 · Programación Web 2026-2 · Variante C: Talleres

**Uso de IA: Nivel 3, Prohibido.** Solo puedes consultar la carpeta `material/` que entrega el docente.

Vas a completar una API REST con Express y Sequelize (PostgreSQL) en `my-api/` y un front en React que la consume en `my-app/`. La estructura es la misma que trabajamos en clase. Busca los comentarios `TODO`: indican qué hay que hacer en cada archivo.

## Cómo levantar el proyecto

Esta copia de práctica usa los puertos `3006` para el backend y `5181` para React. En el examen, usa los puertos que indique el material original.

1. Revisa los datos de conexión en `my-api/src/config/database.js`. La base de datos `examen2db` ya existe.
2. Backend: en `my-api/`, ejecuta `npm run migrate` (crea las tablas y carga datos de prueba) y luego `npm run dev`. Puedes comprobar que el servidor responde en [la raíz del backend](http://127.0.0.1:3006/). La ruta del ejercicio es [`/talleres`](http://127.0.0.1:3006/talleres).
3. Front: en `my-app/`, ejecuta `npm run dev`. La página queda en [React de la Variante C](http://127.0.0.1:5181/).
4. Para probar la API usa `my-api/src/tests/talleres.http` (extensión REST Client de VS Code).

Las dependencias ya están instaladas: **no ejecutes `npm install`** (no hay internet).

## Lo que ya viene listo

- `database.js`, `app.js` (con CORS), `index.js` y el script de migración.
- El modelo `Taller`: `id`, `titulo` (texto), `fecha` (AAAA-MM-DD), `capacidad` (entero).
- `RepositoryBase.js`, igual al de clase.
- En el front: `services/api.js`, el router, el `Header`, el formulario de registro y la carga con `useEffect`.

## Pregunta 1: API REST de talleres (7 puntos)

Completa el repositorio, el controlador y las rutas, con la misma estructura de clase (routes → controller → repository). El controlador usa el repositorio, no el modelo de Sequelize. Basta con que cada operación correcta responda 200.

| Método y ruta | Qué hace |
| --- | --- |
| `GET /talleres` | Devuelve el arreglo, ordenado por `fecha` ascendente |
| `GET /talleres/:id` | Devuelve el registro |
| `POST /talleres` | Crea el registro y lo devuelve |
| `PUT /talleres/:id` | Actualiza el registro |
| `DELETE /talleres/:id` | Elimina el registro |

**Validación:** en POST y PUT, `titulo` no puede estar vacío. Si lo está, responde 400 usando `sendResponse`.

**Adicional (no obligatorio):** responder 404 si el registro no existe y 500 ante un error inesperado.

## Pregunta 2: reservas (3 puntos)

1. Crea el modelo `Reserva` en `src/models/reserva.js` (`nombreAlumno`, `correo`) y la relación 1:N en `relaciones.js` con `hasMany` y `belongsTo` (clave foránea `tallerId`).
2. Implementa `POST /talleres/:id/reservas` con `{ nombreAlumno, correo }`: crea el registro asociado y responde 200 o 201.
3. Modifica `GET /talleres/:id` para que incluya el arreglo `reservas` y el campo calculado `cuposDisponibles` (`capacidad` menos la cantidad de reservas).

Después de crear el modelo, vuelve a ejecutar `npm run migrate` para crear la tabla.

**Nice to have:** validar que el taller exista (404), que vengan ambos campos (400), que el correo no se repita en el taller (409) y que queden cupos (409).

## Pregunta 3: front en React (3 puntos)

CORS ya está configurado y toda la parte de React ya está escrita. Completa solo:

1. En `src/context/TallerContext.jsx`, la función `findAll`: la llamada al API con `api` (de `services/api.js`) que devuelve la lista.
2. En `src/App.jsx`, el recorrido de `talleres` para mostrar una fila por registro con sus tres campos.
3. En `src/context/TallerContext.jsx`, la función `create`: la llamada al API que registra el nuevo registro. El formulario ya muestra el error si el API responde con 400.

## Entrega

Comprime tu carpeta **sin** las carpetas `node_modules` con el nombre `apellido_nombre_C.zip` y súbela a Blackboard antes del cierre.
