import pool from '../db/db.js';
import consultasColoresTabla from '../db/consultas/coloresTabla.js';

export const obtenerColoresTabla = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);

  try {
    pool.query(
      consultasColoresTabla.obtenerColoresTabla,
      [idGrupo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los colores de la tabla.');
  }
};

export const crearColoresTabla = async (req, res) => {
  const [coloresTabla, idGrupos] = req.body;

  const parametrosQuery = [];

  for (let i = 0; i < idGrupos.length; i++) {
    parametrosQuery.push(idGrupos[i]);
  }

  for (let j = 0; j < coloresTabla.length; j++) {
    parametrosQuery.push(
      coloresTabla[j].posiciones,
      coloresTabla[j].color,
      coloresTabla[j].nota
    );
  }

  try {
    pool.query(
      consultasColoresTabla.crearColoresTabla(
        coloresTabla.length,
        idGrupos.length
      ),
      [...parametrosQuery],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send({ message: 'Colores creados exitosamente.' });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos crear los colores.' });
  }
};
