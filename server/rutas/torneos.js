const express = require('express');
const router = express.Router();
const {
  obtenerTorneos,
  crearTorneo,
  obtenerTorneo,
  obtenerTorneoPorSlug,
  editarTorneo,
  borrarTorneo,
} = require('../controladores/torneos');

router.route('/').get(obtenerTorneos).post(crearTorneo);

router.get('/slug/:slugTorneo', obtenerTorneoPorSlug);

router
  .route('/:idTorneo')
  .get(obtenerTorneo)
  .put(editarTorneo)
  .delete(borrarTorneo);

module.exports = router;
