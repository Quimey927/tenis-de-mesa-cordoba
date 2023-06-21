import express from 'express';

import {
  obtenerColoresTabla,
  crearColoresTabla,
  editarColorTabla,
  borrarColorTabla,
  crearColorTabla,
} from '../controladores/coloresTabla.js';

const router = express.Router();

router.route('/crear-colores').post(crearColoresTabla);

router.route('/grupo/:idGrupo').get(obtenerColoresTabla).post(crearColorTabla);

router.route('/:idColor').put(editarColorTabla).delete(borrarColorTabla);

export default router;
