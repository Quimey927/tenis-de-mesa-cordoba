import express from 'express';

import {
  obtenerJugadores,
  crearJugador,
  obtenerJugador,
  editarJugador,
  borrarJugador,
} from '../controladores/jugadores.js';

const router = express.Router();

router.route('/').get(obtenerJugadores).post(crearJugador);

router
  .route('/:idJugador')
  .get(obtenerJugador)
  .put(editarJugador)
  .delete(borrarJugador);

export default router;
