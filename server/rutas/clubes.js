const express = require('express');
const router = express.Router();
const {
  obtenerClubes,
  crearClub,
  obtenerClub,
  editarClub,
  borrarClub,
} = require('../controladores/clubes');

router.route('/').get(obtenerClubes).post(crearClub);

router
  .route('/:nombreClub')
  .get(obtenerClub)
  .put(editarClub)
  .delete(borrarClub);

module.exports = router;
