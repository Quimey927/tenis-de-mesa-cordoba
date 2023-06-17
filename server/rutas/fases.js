import express from 'express';

import {
  obtenerFases,
  crearFase,
  obtenerFase,
  editarFase,
  borrarFase,
} from '../controladores/fases.js';

const router = express.Router();

router.route('/categoria/:idCategoriaFecha').get(obtenerFases);

router.route('/').post(crearFase);

router.route('/:idFase').get(obtenerFase).put(editarFase).delete(borrarFase);

export default router;
