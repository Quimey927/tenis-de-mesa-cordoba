import express from 'express';

import {
  obtenerCategoriasFecha,
  crearCategoriaFecha,
  obtenerCategoriaFecha,
  editarCategoriaFecha,
  borrarCategoriaFecha,
} from '../controladores/categoriasFechas.js';

const router = express.Router();

router.route('/fecha/:idFecha').get(obtenerCategoriasFecha);

router.route('/').post(crearCategoriaFecha);

router
  .route('/:idCategoriaFecha')
  .get(obtenerCategoriaFecha)
  .put(editarCategoriaFecha)
  .delete(borrarCategoriaFecha);

export default router;
