import express from 'express';

import {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarPartido,
  editarSetsPartido,
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

router
  .route('/eliminatoria/:idEliminatoria')
  .get(obtenerPartidosDeLaEliminatoria)
  .post(crearPartidosDeLaEliminatoria);

router.route('/intercambio/:idPartido').put(intercambiarJugadoresPartido);

router.route('/sets/:idPartido').put(editarSetsPartido);

router.route('/').post(crearPartido);

router.route('/:idPartido').put(editarPartido).delete(borrarPartido);

export default router;
