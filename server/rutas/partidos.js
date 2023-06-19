import express from 'express';

import { obtenerPartidosDelGrupo } from '../controladores/partidos.js';

const router = express.Router();

router.route('/grupo/:idGrupo').get(obtenerPartidosDelGrupo);

export default router;
