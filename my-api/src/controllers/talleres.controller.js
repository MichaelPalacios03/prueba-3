import repository from "../repositories/talleres.repository.js";

// TODO (Pregunta 1): funciones findAll, findOne, create, update y remove.
// Validación: en create y update, titulo no puede estar vacío (responder 400).

const sendResponse = (respuesta, message, errorCode, resp) => {
  if (!respuesta)
    return resp.status(errorCode).json({ success:false, message })
  else
    return resp.status(200).json(respuesta);
}
const titulovacio = (titulo) => !titulo || String(titulo).trim() === '';

const findAll = async (req , resp) => {
   try {
    const talleres = await repository.findAll();
    return sendResponse(talleres, 'Error al listar los talleres', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }
  
}

const findOne = async (req,resp) => {
 try {
    const taller = await repository.findOne(req.params.id);
      if (!taller) {
      return sendResponse(null, 'Taller no encontrado', 404, resp);
    }
    const data = taller.toJSON();
    data.cuposDisponibles = data.capacidad - data.reservas.length;
    return sendResponse(data, '', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }

}

const create = async (req, resp) => {
  try {
    if (titulovacio(req.body.titulo)) {
      return sendResponse(null, 'El título no puede estar vacío', 400, resp);
    }
    const { titulo, fecha, capacidad } = req.body;
    const taller = await repository.create({ titulo, fecha, capacidad });
    return sendResponse(taller, 'Error al crear taller', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }
}

const update = async (req, resp) => {
  try {
    if (titulovacio(req.body.titulo)) {
      return sendResponse(null, 'El título no puede estar vacío', 400, resp);
    }
    const existente = await repository.findOne(req.params.id);
    if (!existente) {
      return sendResponse(null, 'Taller no encontrado', 404, resp);
    }
    const { titulo, fecha, capacidad } = req.body;
    await repository.update({ titulo, fecha, capacidad }, req.params.id);
    const actualizado = await repository.findOne(req.params.id);
    return sendResponse(actualizado, 'No se pudo actualizar el taller', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }
}

const remove = async (req, resp) => {
  try {
    const existente = await repository.findOne(req.params.id);
    if (!existente) {
      return sendResponse(null, 'Taller no encontrado', 404, resp);
    }
    await repository.remove(req.params.id);
    return sendResponse({ success: true, message: 'Taller eliminado' }, '', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }
}

const crearReserva = async (req, resp) => {
  try {
    const { nombreAlumno, correo } = req.body;
    const tallerId = req.params.id;
 
    // 1. El taller existe (404)
    const taller = await repository.findOne(tallerId);
    if (!taller) {
      return sendResponse(null, 'Taller no encontrado', 404, resp);
    }
 
    // 2. Vienen ambos campos (400)
    if (!nombreAlumno || !correo) {
      return sendResponse(null, 'Faltan datos obligatorios', 400, resp);
    }
 
    // 3. El correo no se repite en ese taller (409)
    const repetido = await taller.getReservas({ where: { correo } });
    if (repetido.length > 0) {
      return sendResponse(null, 'El alumno ya tiene una reserva para este taller', 409, resp);
    }
 
    // 4. Quedan cupos (409)
    const cantidadReservas = await taller.countReservas();
    if (cantidadReservas >= taller.capacidad) {
      return sendResponse(null, 'No hay cupos disponibles para este taller', 409, resp);
    }
 
    const reserva = await repository.crearReserva(tallerId, { nombreAlumno, correo });
    return sendResponse(reserva, 'Error al crear reserva', 500, resp);
  } catch (error) {
    return sendResponse(null, 'Error inesperado', 500, resp);
  }
}



const controller = { findAll, findOne, create, update, remove, crearReserva }



export default controller;
