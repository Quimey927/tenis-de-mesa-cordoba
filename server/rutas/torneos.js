import express from 'express';

import {
  obtenerTorneos,
  crearTorneo,
  obtenerTorneo,
  obtenerTorneoPorSlug,
  editarTorneo,
  borrarTorneo,
} from '../controladores/torneos.js';

const router = express.Router();

router.route('/').get(obtenerTorneos).post(crearTorneo);

router.get('/slug/:slugTorneo', obtenerTorneoPorSlug);

router
  .route('/:idTorneo')
  .get(obtenerTorneo)
  .put(editarTorneo)
  .delete(borrarTorneo);

export default router;
