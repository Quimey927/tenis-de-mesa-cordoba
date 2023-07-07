import express from 'express';

import {
  obtenerCategoriasTorneo,
  crearCategoriaTorneo,
  obtenerCategoriaTorneo,
  editarCategoriaTorneo,
  borrarCategoriaTorneo,
  obtenerCategoriasTorneoPosibles,
} from '../controladores/categoriasTorneos.js';

const router = express.Router();

router.route('/torneo/:idTorneo').get(obtenerCategoriasTorneo);

router.route('/fecha/:idFecha').get(obtenerCategoriasTorneoPosibles);

router.route('/').post(crearCategoriaTorneo);

router
  .route('/:idCategoriaTorneo')
  .get(obtenerCategoriaTorneo)
  .put(editarCategoriaTorneo)
  .delete(borrarCategoriaTorneo);

export default router;
