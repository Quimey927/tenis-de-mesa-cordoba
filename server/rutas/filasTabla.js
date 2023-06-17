import express from 'express';

import { obtenerFilasTabla } from '../controladores/filasTabla.js';

const router = express.Router();

router.route('/:idGrupo').get(obtenerFilasTabla);

export default router;
