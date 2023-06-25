export const calcularNuevasFilas = (filasTabla, partidosDelGrupo) => {
  const nuevasFilasTabla = [...filasTabla];

  for (let fila of nuevasFilasTabla) {
    fila.pj = 0;
    fila.pg = 0;
    fila.pp = 0;
    fila.sf = 0;
    fila.sc = 0;
    fila.pf = 0;
    fila.pc = 0;

    for (let partido of partidosDelGrupo) {
      if (partido.sets_jugador_1 !== 0 || partido.sets_jugador_2 !== 0) {
        if (fila.id_jugador === partido.id_jugador_1) {
          fila.pj++;
          fila.sf += partido.sets_jugador_1;
          fila.sc += partido.sets_jugador_2;
          partido.sets_jugador_1 > partido.sets_jugador_2
            ? fila.pg++
            : fila.pp++;
          fila.pf += +partido.puntos_jugador_1;
          fila.pc += +partido.puntos_jugador_2;
        }

        if (fila.id_jugador === partido.id_jugador_2) {
          fila.pj++;
          fila.sf += partido.sets_jugador_2;
          fila.sc += partido.sets_jugador_1;
          partido.sets_jugador_2 > partido.sets_jugador_1
            ? fila.pg++
            : fila.pp++;
          fila.pf += +partido.puntos_jugador_2;
          fila.pc += +partido.puntos_jugador_1;
        }
      }
    }
  }

  nuevasFilasTabla.sort((a, b) => {
    if (a.pg === b.pg) {
      const a_cs = a.sf / a.sc;
      const b_cs = b.sf / b.sc;
      if (a_cs === b_cs) {
        const a_cp = a.pf / a.pc;
        const b_cp = b.pf / b.pc;
        return a_cp > b_cp ? -1 : 1;
      } else {
        return a_cs > b_cs ? -1 : 1;
      }
    } else {
      return a.pg > b.pg ? -1 : 1;
    }
  });

  return nuevasFilasTabla;
};
