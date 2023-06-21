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

export const editarColorTabla = async (req, res) => {
  const idColor = parseInt(req.params.idColor);
  const { posiciones, color, nota } = req.body;

  try {
    pool.query(
      consultasColoresTabla.editarColorTabla,
      [posiciones, color, nota, idColor],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send({ message: 'Color editado exitosamente.' });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos editar el color.' });
  }
};

export const borrarColorTabla = async (req, res) => {
  const idColor = parseInt(req.params.idColor);

  try {
    pool.query(
      consultasColoresTabla.borrarColorTabla,
      [idColor],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Color eliminado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el color.');
  }
};

export const crearColorTabla = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);
  const { posiciones, color, nota } = req.body;

  try {
    pool.query(
      consultasColoresTabla.crearColorTabla,
      [idGrupo, posiciones, color, nota],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Color creado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el color.');
  }
};
