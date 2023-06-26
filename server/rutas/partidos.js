import express from 'express';

import {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarPartido,
  editarSetsPartido,
} from '../controladores/partidos.js';

const router = express.Router();

router
  .route('/grupo/:idGrupo')
  .get(obtenerPartidosDelGrupo)
  .post(crearPartidosDelGrupo);

router.route('/intercambio/:idPartido').put(intercambiarJugadoresPartido);

router.route('/sets/:idPartido').put(editarSetsPartido);

router.route('/:idPartido').put(editarPartido);

export default router;
