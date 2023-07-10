import express from 'express';

import {
  obtenerEliminatorias,
  crearEliminatoria,
  obtenerEliminatoria,
} from '../controladores/eliminatorias.js';

const router = express.Router();

router.route('/fase/:idFase').get(obtenerEliminatorias);

router.route('/').post(crearEliminatoria);

router.route('/:idEliminatoria').get(obtenerEliminatoria);

export default router;
