import express from 'express';

import { obtenerColoresTabla } from '../controladores/coloresTabla.js';

const router = express.Router();

router.route('/:idGrupo').get(obtenerColoresTabla);

export default router;
