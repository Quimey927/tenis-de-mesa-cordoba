export const meses = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export const obtenerFechaEnEspañol = (fechaFormateada) => {
  const [año, mes, dia] = fechaFormateada.split('-');

  const nombreDelMes = meses[mes - 1];

  let fechaEnEspañol = `${+dia} de ${nombreDelMes} de ${año}`;

  return fechaEnEspañol;
};
