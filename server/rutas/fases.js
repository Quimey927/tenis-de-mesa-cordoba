import express from 'express';

import { obtenerFases } from '../controladores/fases.js';

const router = express.Router();

router.route('/categoria/:idCategoriaFecha').get(obtenerFases);

export default router;
