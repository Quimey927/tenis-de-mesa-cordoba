import express from 'express';

import {
  obtenerSetsDelGrupo,
  obtenerSetsDeLaEliminatoria,
  editarSet,
  crearSetsPartido,
} from '../controladores/sets.js';

const router = express.Router();

router.route('/partido/:idPartido').post(crearSetsPartido);

router.route('/grupo/:idGrupo').get(obtenerSetsDelGrupo);
router.route('/eliminatoria/:idEliminatoria').get(obtenerSetsDeLaEliminatoria);

router.route('/:idSet').put(editarSet);

export default router;
