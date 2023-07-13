import express from 'express';

import {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  crearPartidosDelGrupoConFecha,
  editarPartido,
  editarResultadoPartido,
  obtenerPartidosDeLaEliminatoria,
  crearPartidosDeLaEliminatoria,
  borrarPartido,
  crearPartido,
} from '../controladores/partidos.js';

const router = express.Router();

router
  .route('/grupo/:idGrupo')
  .get(obtenerPartidosDelGrupo)
  .post(crearPartidosDelGrupo);

router.route('/grupo/fechas/:idGrupo').post(crearPartidosDelGrupoConFecha);

router
  .route('/eliminatoria/:idEliminatoria')
  .get(obtenerPartidosDeLaEliminatoria)
  .post(crearPartidosDeLaEliminatoria);

router.route('/sets/:idPartido').put(editarResultadoPartido);

router.route('/').post(crearPartido);

router.route('/:idPartido').put(editarPartido).delete(borrarPartido);

export default router;
