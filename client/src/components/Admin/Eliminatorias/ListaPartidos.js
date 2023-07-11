import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import {
  editarPartido,
  crearPartido,
  borrarPartido,
  agregarJugadoresACategoriaFecha,
} from '../../../api';
import { obtenerEtapaEliminatoria } from '../../../utils/obtenerEtapaEliminatoria';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import classes from './ListaPartidos.module.css';

const ListaPartidos = ({
  idEliminatoria,
  partidosDeLaEliminatoria,
  controladorRedireccionar,
  jugadores,
  jugadoresDeLaCategoriaFecha,
  categoriaFecha,
  idCategoriaFecha,
  dia,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
    controladorBorrarElemento: controladorBorrarPartidoDeLaEliminatoria,
  } = useGestionarEstadoFilas(
    partidosDeLaEliminatoria,
    editarPartido,
    controladorRedireccionar,
    borrarPartido
  );

  const controladorAgregarPartido = async (evt) => {
    await crearPartido(null, idEliminatoria, dia);
    controladorRedireccionar();
  };

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

  return (
    <>
      <form className={classes.partidos}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Orden</th>
              <th>Jugador 1</th>
              <th style={{ width: '110px' }}>vs.</th>
              <th>Jugador 2</th>
              <th></th>
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
                <td role="cell" data-cell="eliminar">
                  <button
                    type="button"
                    className={classes['btn-eliminar']}
                    onClick={controladorBorrarPartidoDeLaEliminatoria.bind(
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
          className={classes['btn-crear']}
          onClick={controladorAgregarPartido}
        >
          Agregar partido
        </button>
        <button
          type="button"
          className={classes['btn-editar']}
          onClick={controladorEditarFilas}
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
