import express from 'express';

import {
  obtenerClubes,
  crearClub,
  obtenerClub,
  editarClub,
  borrarClub,
} from '../controladores/clubes.js';

const router = express.Router();

router.route('/').get(obtenerClubes).post(crearClub);

router.route('/:idClub').get(obtenerClub).put(editarClub).delete(borrarClub);

export default router;
