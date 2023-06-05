import express from 'express';

import {
  obtenerCategoriasTorneo,
  crearCategoriaTorneo,
  obtenerCategoriaTorneo,
  editarCategoriaTorneo,
  borrarCategoriaTorneo,
} from '../controladores/categorias_torneos.js';

const router = express.Router();

router.route('/torneo/:idTorneo').get(obtenerCategoriasTorneo);

router.route('/').post(crearCategoriaTorneo);

router
  .route('/:idCategoriaTorneo')
  .get(obtenerCategoriaTorneo)
  .put(editarCategoriaTorneo)
  .delete(borrarCategoriaTorneo);

export default router;
