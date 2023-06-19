import express from 'express';

import {
  obtenerGrupos,
  crearGrupo,
  crearGrupos,
  obtenerGrupo,
  editarGrupo,
  borrarGrupo,
} from '../controladores/grupos.js';

const router = express.Router();

router.route('/fase/:idFase').get(obtenerGrupos);

router.route('/').post(crearGrupo);

router.route('/crear-grupos').post(crearGrupos);

router
  .route('/:idGrupo')
  .get(obtenerGrupo)
  .put(editarGrupo)
  .delete(borrarGrupo);

export default router;
