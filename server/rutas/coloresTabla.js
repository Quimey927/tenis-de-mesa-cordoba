import express from 'express';

import {
  obtenerColoresTabla,
  crearColoresTabla,
} from '../controladores/coloresTabla.js';

const router = express.Router();

router.route('/crear-colores').post(crearColoresTabla);

router.route('/:idGrupo').get(obtenerColoresTabla);

export default router;
