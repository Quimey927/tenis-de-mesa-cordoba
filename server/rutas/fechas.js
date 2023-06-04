const express = require('express');
const router = express.Router();

const {
  obtenerFechas,
  crearFecha,
  obtenerFecha,
  obtenerFechaPorSlug,
  editarFecha,
  borrarFecha,
  obtenerFechasDelMes,
} = require('../controladores/fechas');

router.route('/').get(obtenerFechas).post(crearFecha);

router.get('/fechas-del-mes', obtenerFechasDelMes);
router.get('/slug/:slugFecha', obtenerFechaPorSlug);

router
  .route('/:idFecha')
  .get(obtenerFecha)
  .put(editarFecha)
  .delete(borrarFecha);

module.exports = router;
