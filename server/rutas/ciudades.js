import express from 'express';

import {
  obtenerCiudades,
  crearCiudad,
  obtenerCiudad,
  editarCiudad,
  borrarCiudad,
} from '../controladores/ciudades.js';

const router = express.Router();

router.route('/').get(obtenerCiudades).post(crearCiudad);

router
  .route('/:idCiudad')
  .get(obtenerCiudad)
  .put(editarCiudad)
  .delete(borrarCiudad);

export default router;
