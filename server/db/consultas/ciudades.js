const obtenerCiudades = 'SELECT * FROM ciudades';

const crearCiudad = 'INSERT INTO ciudades (nombre) VALUES ($1)';

const obtenerCiudad = 'SELECT * FROM ciudades WHERE nombre = $1';

const editarCiudad = 'UPDATE ciudades SET nombre = $1 WHERE nombre = $2';

const borrarCiudad = 'DELETE FROM ciudades WHERE nombre = $1';

module.exports = {
  obtenerCiudades,
  crearCiudad,
  obtenerCiudad,
  editarCiudad,
  borrarCiudad,
};
