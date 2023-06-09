import express from 'express';

import {
  obtenerFechas,
  obtenerFechasTorneo,
  crearFecha,
  obtenerFecha,
  obtenerFechaPorSlug,
  editarFecha,
  borrarFecha,
  obtenerFechasDelMes,
} from '../controladores/fechas.js';

const router = express.Router();

router.route('/').get(obtenerFechas).post(crearFecha);

router.get('/fechas-del-mes', obtenerFechasDelMes);
router.get('/slug/:slugFecha', obtenerFechaPorSlug);
router.get('/torneo/:idTorneo', obtenerFechasTorneo);

router
  .route('/:idFecha')
  .get(obtenerFecha)
  .put(editarFecha)
  .delete(borrarFecha);

export default router;
