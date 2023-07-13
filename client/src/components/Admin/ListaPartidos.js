import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  editarPartido,
  crearPartido,
  borrarPartido,
  crearSetsPartido,
} from '../../api';
import { obtenerEtapaEliminatoria } from '../../utils/obtenerEtapaEliminatoria';
import { obtenerNombreCompleto } from '../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../hooks/useGestionarEstadoFilas';
import classes from './ListaPartidos.module.css';

const ListaPartidos = ({
  idGrupo,
  idEliminatoria,
  partidosDelGrupo,
  partidosDeLaEliminatoria,
  controladorRedireccionar,
  jugadores,
  jugadoresDelGrupo,
  dia,
  setMostrarSets,
  agregarJugadoresALaCategoriaFecha,
}) => {
  const {
    filasEditandose,
    nuevasFilas,
    controladorEditarFilas,
    controladorCambiarValorFila,
    controladorBorrarElemento: controladorBorrarPartidoDeLaEtapa, //etapa puede ser un grupo o una eliminatoria
  } = useGestionarEstadoFilas(
    partidosDeLaEliminatoria ? partidosDeLaEliminatoria : partidosDelGrupo,
    editarPartido,
    controladorRedireccionar,
    borrarPartido
  );

  const controladorAgregarPartido = async (evt) => {
    const idPartido = await crearPartido(
      idGrupo ? idGrupo : null,
      idEliminatoria ? idEliminatoria : null,
      dia
    );
    await crearSetsPartido(idPartido[0].id);
    controladorRedireccionar();
  };

  const controladorEditarSets = () => {
    setMostrarSets(true);
  };

  const controladorTerminarEdicionPartidos = async () => {
    await controladorEditarFilas();
    agregarJugadoresALaCategoriaFecha !== undefined &&
      (await agregarJugadoresALaCategoriaFecha(nuevasFilas));
  };

  const algunPartidoTieneNumFecha = partidosDelGrupo
    ? partidosDelGrupo
        .map((partido) => partido.num_fecha)
        .filter((num_fecha) => num_fecha !== null).length > 0
    : false;

  const partidosDeLaEtapa = partidosDelGrupo
    ? partidosDelGrupo
    : partidosDeLaEliminatoria;

  const jugadoresPosibles = idEliminatoria ? jugadores : jugadoresDelGrupo;

  return (
    <>
      <form className={classes.partidos}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>
                {idGrupo ? (algunPartidoTieneNumFecha ? 'Fecha' : '') : 'Etapa'}
              </th>
              <th>Orden</th>
              <th>Jugador 1</th>
              <th style={{ width: '110px' }}>vs.</th>
              <th>Jugador 2</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {partidosDeLaEtapa.map((partido) => (
              <tr key={partido.id}>
                <td
                  style={
                    idEliminatoria ? { width: '150px', fontWeight: '700' } : {}
                  }
                >
                  {idEliminatoria ? (
                    obtenerEtapaEliminatoria(partido.orden)
                  ) : !algunPartidoTieneNumFecha ? (
                    ''
                  ) : filasEditandose ? (
                    <input
                      name={`num_fecha-${partido.id}`}
                      defaultValue={partido.num_fecha}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : (
                    partido.num_fecha
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
                      {jugadoresPosibles.map((jugador) => (
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
                    <button type="button" onClick={controladorEditarSets}>
                      <span>
                        {partido.sets_jugador_1} - {partido.sets_jugador_2}
                      </span>
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
                      {jugadoresPosibles.map((jugador) => (
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
                <td role="cell" data-cell="eliminar">
                  <button
                    type="button"
                    className={classes['btn-eliminar']}
                    onClick={controladorBorrarPartidoDeLaEtapa.bind(
                      null,
                      partido.id
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: 'rgb(197, 12, 12)' }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div className={classes.acciones}>
        <button
          type="button"
          className="crear-jugador--button"
          onClick={controladorAgregarPartido}
        >
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span> Agregar Partido</span>
          </>
        </button>

        <button
          type="button"
          className={classes['btn-editar']}
          onClick={controladorTerminarEdicionPartidos}
        >
          {filasEditandose ? (
            <span>Guardar Cambios</span>
          ) : (
            <span>Editar Tabla</span>
          )}
        </button>
      </div>
    </>
  );
};

export default ListaPartidos;
