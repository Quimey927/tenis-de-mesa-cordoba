import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

import { editarPartido } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import classes from './ListaPartidos.module.css';

const ListaPartidos = ({
  idEliminatoria,
  partidosDelGrupo,
  setJugador1,
  setJugador2,
  controladorRedireccionar,
  jugadores,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
  } = useGestionarEstadoFilas(
    partidosDelGrupo,
    editarPartido,
    controladorRedireccionar
  );

  return (
    <>
      <form className={classes.partidos}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>{partidosDelGrupo[0].num_fecha ? 'Fecha' : ''}</th>
              <th>Orden</th>
              <th>Jugador 1</th>
              <th style={{ width: '110px' }}>vs.</th>
              <th>Jugador 2</th>
            </tr>
          </thead>
          <tbody>
            {partidosDelGrupo.map((partido) => (
              <tr key={partido.id}>
                <td>
                  {!partidosDelGrupo[0].num_fecha ? (
                    ''
                  ) : filasEditandose ? (
                    <input
                      name={`fecha-${partido.id}`}
                      defaultValue={partido.fecha}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : (
                    partido.fecha
                  )}
                </td>
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
                  {filasEditandose ? (
                    <select
                      name={`id_jugador_1-${partido.id}`}
                      defaultValue={
                        partido.id_jugador_1 ? partido.id_jugador_1 : ''
                      }
                      onChange={controladorCambiarValorFila}
                    >
                      <option value="">Elegir jugador</option>
                      {jugadores.map((jugador) => (
                        <option key={jugador.id} value={+jugador.id}>
                          {obtenerNombreCompleto(
                            jugador.nombre,
                            jugador.segundo_nombre,
                            jugador.apellido,
                            jugador.segundo_apellido
                          )}
                        </option>
                      ))}
                    </select>
                  ) : partido.jugador_1_nombre ? (
                    obtenerNombreCompleto(
                      partido.jugador_1_nombre,
                      partido.jugador_1_segundo_nombre,
                      partido.jugador_1_apellido,
                      partido.jugador_1_segundo_apellido
                    )
                  ) : (
                    'No Definido'
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
                    <span>
                      {partido.sets_jugador_1} - {partido.sets_jugador_2}
                    </span>
                  )}
                </td>
                <td>
                  {filasEditandose ? (
                    <select
                      name={`id_jugador_2-${partido.id}`}
                      defaultValue={
                        partido.id_jugador_2 ? partido.id_jugador_2 : ''
                      }
                      onChange={controladorCambiarValorFila}
                    >
                      <option value="">Elegir jugador</option>
                      {jugadores.map((jugador) => (
                        <option key={jugador.id} value={+jugador.id}>
                          {obtenerNombreCompleto(
                            jugador.nombre,
                            jugador.segundo_nombre,
                            jugador.apellido,
                            jugador.segundo_apellido
                          )}
                        </option>
                      ))}
                    </select>
                  ) : partido.jugador_2_nombre ? (
                    obtenerNombreCompleto(
                      partido.jugador_2_nombre,
                      partido.jugador_2_segundo_nombre,
                      partido.jugador_2_apellido,
                      partido.jugador_2_segundo_apellido
                    )
                  ) : (
                    'No Definido'
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
