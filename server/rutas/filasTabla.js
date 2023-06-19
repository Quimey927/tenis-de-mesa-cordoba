import express from 'express';

import {
  obtenerFilasTabla,
  agregarJugadores,
} from '../controladores/filasTabla.js';

const router = express.Router();

router.route('/grupo/:idGrupo').post(agregarJugadores);

router.route('/:idGrupo').get(obtenerFilasTabla);

export default router;
