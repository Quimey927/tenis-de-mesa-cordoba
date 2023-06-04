const express = require('express');
const router = express.Router();
const {
  obtenerCiudades,
  crearCiudad,
  obtenerCiudad,
  editarCiudad,
  borrarCiudad,
} = require('../controladores/ciudades');

router.route('/').get(obtenerCiudades).post(crearCiudad);

router
  .route('/:nombreCiudad')
  .get(obtenerCiudad)
  .put(editarCiudad)
  .delete(borrarCiudad);

module.exports = router;
