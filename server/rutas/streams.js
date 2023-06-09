import express from 'express';

import {
  obtenerStreams,
  crearStream,
  obtenerStream,
  obtenerStreamActivo,
  editarStream,
  borrarStream,
} from '../controladores/streams.js';

const router = express.Router();

router.route('/activo').get(obtenerStreamActivo);

router.route('/fecha/:idFecha').get(obtenerStreams);

router.route('/').post(crearStream);

router
  .route('/:idStream')
  .get(obtenerStream)
  .put(editarStream)
  .delete(borrarStream);

export default router;
