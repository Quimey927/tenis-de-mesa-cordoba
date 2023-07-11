import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import {
  editarPosicionYPuntaje,
  borrarJugadorDeCategoriaFecha,
  crearNuevoJugador,
  agregarJugadorACategoriaTorneo,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import useAgregarElementosAUnaLista from '../../../hooks/useAgregarElementosAUnaLista';
import classes from './PosicionesYPuntajes.module.css';

const PosicionesYPuntajes = ({
  jugadoresDeLaCategoriaFecha,
  controladorRedireccionar,
  categoriaFecha,
  idCategoriaFecha,
  jugadores,
  categoriasTorneoPosibles,
  jugadoresDeLasCategoriasTorneos,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
    controladorBorrarElemento: controladorBorrarJugadorCategoriaFecha,
  } = useGestionarEstadoFilas(
    jugadoresDeLaCategoriaFecha,
    editarPosicionYPuntaje,
    controladorRedireccionar,
    borrarJugadorDeCategoriaFecha
  );

  const {
    controladorCerrarAgregarElemento: controladorCerrarAgregarJugador,
    controladorCambiarNuevoElemento: controladorCambiarNuevoJugador,
    controladorAgregarNuevoElemento: controladorAgregarNuevoJugador,
    agregandoNuevoElemento: agregandoNuevoJugador,
  } = useAgregarElementosAUnaLista(
    crearNuevoJugador,
    controladorRedireccionar,
    [idCategoriaFecha, categoriaFecha[0].id_categoria_torneo_default]
  );

  /* for (let fila of jugadoresDeLaCategoriaFecha) {
    
    const jugadorYaEstaEnLaCategoriaTorneo = (fila) => {
      let { id_jugador, id_categoria_torneo } = fila;
      
      return jugadoresDeLasCategoriasTorneos.filter(
            (jugador) =>
              jugador.id_jugador === id_jugador &&
              jugador.id_categoria_torneo ===
                id_categoria_torneo
          ).length > 0;
    }

        if (
          id_categoria_torneo &&
          !jugadorYaEstaEnLaCategoriaTorneo
        ) {
          agregarJugadorACategoriaTorneo({
            idCategoriaTorneo: id_categoria_torneo,
            idJugador: id_jugador,
          });
        }
  }
 */

  const jsxCrearJugador = (
    <div className={classes['crear-jugador']}>
      <button type="button" onClick={controladorAgregarNuevoJugador}>
        {!agregandoNuevoJugador ? (
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span> Agregar Jugador</span>
          </>
        ) : (
          <FontAwesomeIcon icon={faSave} />
        )}
      </button>
      {agregandoNuevoJugador && (
        <>
          <select
            name="color"
            onChange={controladorCambiarNuevoJugador}
            required={true}
          >
            <option value="">Elegir jugador</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>
                {obtenerNombreCompleto(
                  jugador.nombre,
                  jugador.segundo_nombre,
                  jugador.apellido,
                  jugador.segundo_apellido
                )}
              </option>
            ))}
          </select>

          <button type="button" onClick={controladorCerrarAgregarJugador}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      )}
    </div>
  );

  if (jugadoresDeLaCategoriaFecha.length === 0) {
    return (
      <>
        <AdminTituloPagina titulo="Posiciones y puntajes" />
        <p>No hay jugadores registrados aún en esta categoría</p>
        {jsxCrearJugador}
      </>
    );
  }

  return (
    <>
      <AdminTituloPagina titulo="Posiciones y puntajes" />

      <form className={classes.posiciones}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Jugador</th>
              <th>Puntaje</th>
              <th>Cat. Torn. donde suma</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {jugadoresDeLaCategoriaFecha.map((jugador) => (
              <tr key={jugador.id}>
                <td>
                  {filasEditandose ? (
                    <input
                      type="number"
                      name={`posicion-${jugador.id}`}
                      defaultValue={jugador.posicion}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : jugador.posicion ? (
                    jugador.posicion
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {obtenerNombreCompleto(
                    jugador.nombre,
                    jugador.segundo_nombre,
                    jugador.apellido,
                    jugador.segundo_apellido
                  )}
                </td>
                <td>
                  {filasEditandose ? (
                    <input
                      type="number"
                      name={`puntaje-${jugador.id}`}
                      defaultValue={jugador.puntaje}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : jugador.puntaje ? (
                    jugador.puntaje
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {filasEditandose ? (
                    <select
                      name={`id_categoria_torneo-${jugador.id}`}
                      defaultValue={
                        jugador.id_categoria_torneo
                          ? jugador.id_categoria_torneo
                          : ''
                      }
                      onChange={controladorCambiarValorFila}
                    >
                      <option value="">Sin Categoría Asignada</option>
                      {categoriasTorneoPosibles.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.categoria}
                        </option>
                      ))}
                    </select>
                  ) : jugador.categoria ? (
                    jugador.categoria
                  ) : (
                    'Sin Categoría Asignada'
                  )}
                </td>
                <td role="cell" data-cell="eliminar">
                  <button
                    type="button"
                    className={classes['btn-eliminar']}
                    onClick={controladorBorrarJugadorCategoriaFecha.bind(
                      null,
                      jugador.id
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

        <div className={classes.acciones}>
          {jsxCrearJugador}

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
      </form>
    </>
  );
};

export default PosicionesYPuntajes;
