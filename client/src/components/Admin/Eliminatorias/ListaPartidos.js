import { editarPartido, agregarJugadoresACategoriaFecha } from '../../../api';
import { obtenerEtapaEliminatoria } from '../../../utils/obtenerEtapaEliminatoria';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import classes from './ListaPartidosYSets.module.css';

const ListaPartidos = ({
  idGrupo,
  partidosDeLaEliminatoria,
  setJugador1,
  setJugador2,
  controladorRedireccionar,
  jugadores,
  jugadoresDeLaCategoriaFecha,
  categoriaFecha,
  idCategoriaFecha,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
  } = useGestionarEstadoFilas(
    partidosDeLaEliminatoria,
    editarPartido,
    controladorRedireccionar
  );

  // const jugadoresPartido = [
  //   +partidoEditandose.id_jugador_1,
  //   +partidoEditandose.id_jugador_2,
  // ];

  // const nuevosJugadores = jugadoresPartido.filter(
  //   (jugador) =>
  //     jugador > 0 && !jugadoresDeLaCategoriaFecha.includes(jugador)
  // );

  // agregarJugadoresACategoriaFecha(
  //   nuevosJugadores,
  //   idCategoriaFecha,
  //   categoriaFecha[0].id_categoria_torneo_default
  // );

  const controladorSetearSetsEditandose = (idPartido, jugador_1, jugador_2) => {
    setJugador1(jugador_1);
    setJugador2(jugador_2);
    controladorRedireccionar(idGrupo, idPartido);
  };

  return (
    <>
      <form className={classes.partidos}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Número</th>
              <th>Jugador 1</th>
              <th style={{ width: '110px' }}>vs.</th>
              <th>Jugador 2</th>
            </tr>
          </thead>
          <tbody>
            {partidosDeLaEliminatoria.map((partido) => (
              <tr key={partido.id}>
                <td style={{ width: '150px', fontWeight: '700' }}>
                  {obtenerEtapaEliminatoria(partido.orden)}
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
                    <button
                      type="button"
                      onClick={controladorSetearSetsEditandose.bind(
                        null,
                        partido.id,
                        partido.jugador_1_nombre
                          ? obtenerNombreCompleto(
                              partido.jugador_1_nombre,
                              partido.jugador_1_segundo_nombre,
                              partido.jugador_1_apellido,
                              partido.jugador_1_segundo_apellido
                            )
                          : 'No Definido',
                        partido.jugador_2_nombre
                          ? obtenerNombreCompleto(
                              partido.jugador_2_nombre,
                              partido.jugador_2_segundo_nombre,
                              partido.jugador_2_apellido,
                              partido.jugador_2_segundo_apellido
                            )
                          : 'No Definido'
                      )}
                    >
                      {partido.sets_jugador_1} - {partido.sets_jugador_2}
                    </button>
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
                      <option value="">No Definido</option>
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
