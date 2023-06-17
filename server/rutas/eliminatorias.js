import express from 'express';

import { obtenerEliminatorias } from '../controladores/eliminatorias.js';

const router = express.Router();

router.route('/fase/:idFase').get(obtenerEliminatorias);

export default router;
