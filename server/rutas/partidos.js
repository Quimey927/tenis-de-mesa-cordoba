import express from 'express';

import {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarOrdenPartido,
} from '../controladores/partidos.js';

const router = express.Router();

router
  .route('/grupo/:idGrupo')
  .get(obtenerPartidosDelGrupo)
  .post(crearPartidosDelGrupo);

router.route('/intercambio/:idPartido').put(intercambiarJugadoresPartido);

router.route('/orden/:idPartido').put(editarOrdenPartido);

export default router;
