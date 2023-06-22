import express from 'express';

import {
  obtenerSets,
  editarSet,
  borrarSet,
  crearSet,
} from '../controladores/sets.js';

const router = express.Router();

router.route('/partido/:idPartido').get(obtenerSets).post(crearSet);

router.route('/:idSet').put(editarSet).delete(borrarSet);

export default router;
