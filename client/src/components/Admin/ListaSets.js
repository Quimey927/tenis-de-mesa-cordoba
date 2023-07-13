import { useState } from 'react';

import { editarResultadoPartido, editarSet } from '../../api';
import { obtenerNombreCompleto } from '../../utils/obtenerNombreCompleto';
import classes from './ListaSets.module.css';

const ListaSets = ({
  sets,
  partidosDeLaEtapa,
  controladorRedireccionar,
  setMostrarSets,
  actualizarTablaPosiciones,
}) => {
  const [setsEditandose, setSetsEditandose] = useState(false);
  const [nuevosSets, setNuevosSets] = useState(sets);

  const controladorVolverAPartidos = () => {
    setMostrarSets(false);
  };

  const controladorEditarSets = async () => {
    if (!setsEditandose) {
      setSetsEditandose(true);
    } else {
      // guardar nuevos sets
      for (let set of nuevosSets) {
        await editarSet(set);
      }

      // actualizar sets_jugador_1 y sets_jugador_2 en cada partido
      for (let partido of partidosDeLaEtapa) {
        let sets_jugador_1 = 0;
        let sets_jugador_2 = 0;
        let setsDelPartido = nuevosSets.filter(
          (set) => set.id_partido === partido.id
        );
        for (let set of setsDelPartido) {
          set.puntos_jugador_1 > set.puntos_jugador_2 && sets_jugador_1++;
          set.puntos_jugador_2 > set.puntos_jugador_1 && sets_jugador_2++;
        }

        if (sets_jugador_1 !== 0 || sets_jugador_2 !== 0) {
          await editarResultadoPartido({
            sets_jugador_1,
            sets_jugador_2,
            id: partido.id,
          });
        } else {
          await editarResultadoPartido({
            sets_jugador_1: null,
            sets_jugador_2: null,
            id: partido.id,
          });
        }
      }

      // actualizar tabla de posiciones
      actualizarTablaPosiciones !== undefined &&
        actualizarTablaPosiciones(nuevosSets);

      setSetsEditandose(false);
      setMostrarSets(false);
      controladorRedireccionar();
    }
  };

  const controladorCambiarValorSet = (evt) => {
    setNuevosSets((setsPrevios) => {
      const [id_partido, num_set, num_jugador] = evt.target.name.split('-');
      const setsActuales = [...setsPrevios];

      const indexSetEditado = setsActuales.findIndex(
        (set) => set.id_partido === +id_partido && set.num_set === +num_set
      );

      setsActuales[indexSetEditado][`puntos_jugador_${num_jugador}`] =
        evt.target.value !== '' ? evt.target.value : null;
      return setsActuales;
    });
  };

  return (
    <>
      <form className={classes.partidos}>
        {partidosDeLaEtapa.map((partido) => (
          <div key={partido.id} className={classes.partido}>
            <div>
              <div style={{ textAlign: 'start' }}>
                {partido.jugador_1_nombre
                  ? obtenerNombreCompleto(
                      partido.jugador_1_nombre,
                      partido.jugador_1_segundo_nombre,
                      partido.jugador_1_apellido,
                      partido.jugador_1_segundo_apellido
                    )
                  : 'No Definido'}
              </div>
              <div style={{ textAlign: 'start' }}>
                {partido.jugador_2_nombre
                  ? obtenerNombreCompleto(
                      partido.jugador_2_nombre,
                      partido.jugador_2_segundo_nombre,
                      partido.jugador_2_apellido,
                      partido.jugador_2_segundo_apellido
                    )
                  : 'No Definido'}
              </div>
            </div>
            {sets
              .filter((set) => set.id_partido === partido.id)
              .sort((a, b) => a.num_set - b.num_set)
              .map((set) => (
                <div key={set.id}>
                  <div>
                    {setsEditandose ? (
                      <input
                        name={`${set.id_partido}-${set.num_set}-1`}
                        defaultValue={
                          set.puntos_jugador_1 !== null
                            ? set.puntos_jugador_1
                            : ''
                        }
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorSet}
                      />
                    ) : set.puntos_jugador_1 !== null ? (
                      set.puntos_jugador_1
                    ) : (
                      '-'
                    )}
                  </div>
                  <div>
                    {setsEditandose ? (
                      <input
                        name={`${set.id_partido}-${set.num_set}-2`}
                        defaultValue={
                          set.puntos_jugador_2 !== null
                            ? set.puntos_jugador_2
                            : ''
                        }
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorSet}
                      />
                    ) : set.puntos_jugador_2 !== null ? (
                      set.puntos_jugador_2
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </form>

      <div className={classes.acciones}>
        <button
          type="button"
          className={classes['btn-editar']}
          disabled={setsEditandose}
          onClick={controladorVolverAPartidos}
        >
          Volver a Partidos
        </button>

        <button
          type="button"
          className={classes['btn-editar']}
          onClick={controladorEditarSets}
        >
          {setsEditandose ? (
            <span>Guardar Cambios</span>
          ) : (
            <span>Editar Sets</span>
          )}
        </button>
      </div>
    </>
  );
};

export default ListaSets;
