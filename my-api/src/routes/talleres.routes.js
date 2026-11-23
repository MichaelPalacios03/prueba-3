import express from 'express';
import controller from '../controllers/talleres.controller.js';

const router = express.Router();
router.get('/' , controller.findAll)
router.get('/:id', controller.findOne)

// TODO (Pregunta 1): GET /, GET /:id, POST /, PUT /:id, DELETE /:id
// TODO (Pregunta 2): POST /:id/reservas

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/reservas', controller.crearReserva);


export default router;
