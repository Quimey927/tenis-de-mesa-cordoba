export const calcularNuevasFilas = (filasTabla, sets) => {
  const nuevasFilasTabla = [...filasTabla];

  for (let fila of nuevasFilasTabla) {
    fila.pj = 0;
    fila.pg = 0;
    fila.pp = 0;
    fila.sf = 0;
    fila.sc = 0;
    fila.pf = 0;
    fila.pc = 0;
  }

  let variableDeSeguridad = 0; // para evitar escenarios donde la condicion del while resulta ser verdadera siempre y se generan loops infinitos
  const valorMaximo = 100; // por lo tanto, se asegura que a lo sumo en 101 iteraciones la condición va a resultar falsa

  do {
    let idPrimerPartido = sets[0].id_partido;

    let setsDelPartido = sets.filter(
      (set) => set.id_partido === idPrimerPartido
    );

    let fila_jugador_1 = nuevasFilasTabla.find(
      (fila) => fila.id_jugador === setsDelPartido[0].id_jugador_1
    );
    let fila_jugador_2 = nuevasFilasTabla.find(
      (fila) => fila.id_jugador === setsDelPartido[0].id_jugador_2
    );

    let sets_jugador_1 = 0;
    let sets_jugador_2 = 0;

    for (let set of setsDelPartido) {
      if (set.puntos_jugador_1 !== null && set.puntos_jugador_2 !== null) {
        set.puntos_jugador_1 > set.puntos_jugador_2 && sets_jugador_1++;
        set.puntos_jugador_2 > set.puntos_jugador_1 && sets_jugador_2++;
        fila_jugador_1.pf += set.puntos_jugador_1;
        fila_jugador_1.pc += set.puntos_jugador_2;
        fila_jugador_2.pf += set.puntos_jugador_2;
        fila_jugador_2.pc += set.puntos_jugador_1;
      }
    }

    if (sets_jugador_1 > 0 || sets_jugador_2 > 0) {
      fila_jugador_1.pj++;
      fila_jugador_2.pj++;
      fila_jugador_1.sf += sets_jugador_1;
      fila_jugador_2.sf += sets_jugador_2;
      fila_jugador_1.sc += sets_jugador_2;
      fila_jugador_2.sc += sets_jugador_1;
      if (sets_jugador_1 > sets_jugador_2) {
        fila_jugador_1.pg++;
        fila_jugador_2.pp++;
      } else {
        fila_jugador_2.pg++;
        fila_jugador_1.pp++;
      }
    }

    sets = sets.filter((set) => set.id_partido !== idPrimerPartido);
  } while (sets.length > 0 && variableDeSeguridad++ < valorMaximo);

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

  for (let [i, fila] of nuevasFilasTabla.entries()) {
    fila.posicion = i + 1;
  }

  return nuevasFilasTabla;
};
