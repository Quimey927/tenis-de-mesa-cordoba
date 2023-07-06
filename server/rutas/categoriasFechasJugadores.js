import express from 'express';

import {
  agregarJugadoresACategoriaFecha,
  obtenerJugadoresDeLaCategoriaFecha,
  editarPosicionYPuntaje,
  borrarJugadorDeCategoriaFecha,
  crearNuevoJugador,
} from '../controladores/categoriasFechasJugadores.js';

const router = express.Router();

router
  .route('/jugadores/:idCategoriaFecha')
  .post(agregarJugadoresACategoriaFecha);

router
  .route('/categoria-fecha/:idCategoriaFecha')
  .get(obtenerJugadoresDeLaCategoriaFecha)
  .post(crearNuevoJugador);

router
  .route('/:idFila')
  .put(editarPosicionYPuntaje)
  .delete(borrarJugadorDeCategoriaFecha);

export default router;
