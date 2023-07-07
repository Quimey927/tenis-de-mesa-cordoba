import express from 'express';

import {
  obtenerJugadoresDeLasCategoriasTorneos,
  agregarJugadorACategoriaTorneo,
  obtenerJugadoresDeLaCategoriaTorneo,
  editarPosicionYPuntajeCategoriaTorneo,
  crearNuevoJugadorCategoriaTorneo,
  borrarJugadorDeCategoriaTorneo,
} from '../controladores/categoriasTorneosJugadores.js';

const router = express.Router();

router
  .route('/')
  .get(obtenerJugadoresDeLasCategoriasTorneos)
  .post(agregarJugadorACategoriaTorneo);

router
  .route('/categoria-torneo/:idCategoriaTorneo')
  .get(obtenerJugadoresDeLaCategoriaTorneo);

router.route('/nuevo-jugador').post(crearNuevoJugadorCategoriaTorneo);

router
  .route('/:idFila')

  .put(editarPosicionYPuntajeCategoriaTorneo)
  .delete(borrarJugadorDeCategoriaTorneo);

export default router;
