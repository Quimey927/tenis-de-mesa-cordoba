export const obtenerDiasDeTorneo = (fechas) => {
  const diasDeTorneo = [];

  if (fechas.length > 0) {
    fechas.forEach((fecha) => {
      let dia_inicio = fecha.fecha_inicio.substring(0, 10).split('-')[2];
      let dia_finalizacion = fecha.fecha_finalizacion
        .substring(0, 10)
        .split('-')[2];

      diasDeTorneo.push(+dia_inicio);
      if (dia_inicio !== dia_finalizacion) {
        diasDeTorneo.push(+dia_finalizacion);
      }
    });
  }

  return diasDeTorneo;
};
