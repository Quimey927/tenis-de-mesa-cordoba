import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

import { intercambiarJugadoresPartido, editarPartido } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import classes from './ListaPartidosYSets.module.css';

const ListaPartidos = ({
  idEliminatoria,
  partidosDelGrupo,
  setJugador1,
  setJugador2,
  controladorRedireccionar,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
    setNuevasFilas,
  } = useGestionarEstadoFilas(
    partidosDelGrupo,
    editarPartido,
    controladorRedireccionar
  );

  const controladorSetearSetsEditandose = (idPartido, jugador_1, jugador_2) => {
    setJugador1(jugador_1);
    setJugador2(jugador_2);
    controladorRedireccionar(idEliminatoria, idPartido);
  };

  const controladorIntercambiarJugadores = (idPartido) => {
    intercambiarJugadoresPartido(idPartido);
    if (filasEditandose) {
      setNuevasFilas((filasPrevias) => {
        const nuevasFilas = [...filasPrevias];
        nuevasFilas.map((fila) => {
          return fila.id !== idPartido
            ? fila
            : ([fila.id_jugador_1, fila.id_jugador_2] = [
                fila.id_jugador_2,
                fila.id_jugador_1,
              ]);
        });
        return nuevasFilas;
      });
    }
    controladorRedireccionar();
  };

  return (
    <>
      <form className={classes.partidos}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Orden</th>
              <th style={{ width: '80px' }}>Intercambiar</th>
              <th>Jugador 1</th>
              <th style={{ width: '110px' }}>vs.</th>
              <th>Jugador 2</th>
            </tr>
          </thead>
          <tbody>
            {partidosDelGrupo.map((partido) => (
              <tr key={partido.id}>
                <td>
                  {filasEditandose ? (
                    <input
                      name={`orden-${partido.id}`}
                      defaultValue={partido.orden}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : (
                    partido.orden
                  )}
                </td>

                <td>
                  <button
                    type="button"
                    style={{ cursor: 'pointer' }}
                    onClick={controladorIntercambiarJugadores.bind(
                      null,
                      partido.id
                    )}
                  >
                    <FontAwesomeIcon icon={faRightLeft} />
                  </button>
                </td>

                <td>
                  {obtenerNombreCompleto(
                    partido.jugador_1_nombre,
                    partido.jugador_1_segundo_nombre,
                    partido.jugador_1_apellido,
                    partido.jugador_1_segundo_apellido
                  )}
                </td>
                <td>
                  {filasEditandose ? (
                    <>
                      <input
                        name={`sets_jugador_1-${partido.id}`}
                        defaultValue={partido.sets_jugador_1}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorFila}
                      />
                      <span>-</span>
                      <input
                        name={`sets_jugador_2-${partido.id}`}
                        defaultValue={partido.sets_jugador_2}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorFila}
                      />
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={controladorSetearSetsEditandose.bind(
                        null,
                        partido.id,
                        obtenerNombreCompleto(
                          partido.jugador_1_nombre,
                          partido.jugador_1_segundo_nombre,
                          partido.jugador_1_apellido,
                          partido.jugador_1_segundo_apellido
                        ),
                        obtenerNombreCompleto(
                          partido.jugador_2_nombre,
                          partido.jugador_2_segundo_nombre,
                          partido.jugador_2_apellido,
                          partido.jugador_2_segundo_apellido
                        )
                      )}
                    >
                      {partido.sets_jugador_1} - {partido.sets_jugador_2}
                    </button>
                  )}
                </td>
                <td>
                  {obtenerNombreCompleto(
                    partido.jugador_2_nombre,
                    partido.jugador_2_segundo_nombre,
                    partido.jugador_2_apellido,
                    partido.jugador_2_segundo_apellido
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <button
        type="button"
        className={classes['btn-editar']}
        onClick={controladorEditarFilas}
      >
        {filasEditandose ? (
          <span>Guardar Cambios</span>
        ) : (
          <span>Editar Partidos</span>
        )}
      </button>
    </>
  );
};

export default ListaPartidos;
