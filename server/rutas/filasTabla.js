import express from 'express';

import {
  obtenerFilasTabla,
  crearFilasTabla,
  editarFilaTabla,
} from '../controladores/filasTabla.js';

const router = express.Router();

router.route('/grupo/:idGrupo').get(obtenerFilasTabla).post(crearFilasTabla);

router.route('/:idFila').put(editarFilaTabla);

export default router;
