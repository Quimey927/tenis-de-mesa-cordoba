const express = require('express');
const router = express.Router();
const {
  obtenerJugadores,
  crearJugador,
  obtenerJugador,
  editarJugador,
  borrarJugador,
} = require('../controladores/jugadores');

router.route('/').get(obtenerJugadores).post(crearJugador);

router
  .route('/:idJugador')
  .get(obtenerJugador)
  .put(editarJugador)
  .delete(borrarJugador);

module.exports = router;
