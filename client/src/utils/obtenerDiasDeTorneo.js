export const obtenerDiasDeTorneo = (fechas) => {
  const diasDeTorneo = [];

  if (fechas.length > 0) {
    fechas.forEach((fecha) => {
      let dia_inicio = fecha.fecha_inicio.substring(0, 10).split('-')[2];
      let dia_finalizacion = fecha.fecha_finalizacion
        .substring(0, 10)
        .split('-')[2];

      if (dia_inicio !== dia_finalizacion) {
        diasDeTorneo.push({ dia: +dia_inicio, border: 'i' }); // borde izquierdo solo en calendario
        diasDeTorneo.push({ dia: +dia_finalizacion, border: 'd' }); // borde derecho solo en calendario
      } else {
        diasDeTorneo.push({ dia: +dia_inicio, border: 'a' }); // ambos bordes en calendario
      }
    });
  }

  return diasDeTorneo;
};
