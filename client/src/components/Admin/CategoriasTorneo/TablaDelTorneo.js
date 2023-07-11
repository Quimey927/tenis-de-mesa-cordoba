import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import {
  editarPosicionYPuntajeCategoriaTorneo,
  borrarJugadorDeCategoriaTorneo,
  crearNuevoJugadorCategoriaTorneo,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';
import useAgregarElementosAUnaLista from '../../../hooks/useAgregarElementosAUnaLista';
import classes from './TablaDelTorneo.module.css';

const TablaDelTorneo = ({
  jugadoresDeLaCategoriaTorneo,
  idCategoriaTorneo,
  controladorRedireccionar,
  jugadores,
  datosTablaCategoriaTorneo,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
    controladorBorrarElemento: controladorBorrarJugadorCategoriaTorneo,
  } = useGestionarEstadoFilas(
    jugadoresDeLaCategoriaTorneo,
    editarPosicionYPuntajeCategoriaTorneo,
    controladorRedireccionar,
    borrarJugadorDeCategoriaTorneo
  );

  const { jsxCrearJugador } = useAgregarElementosAUnaLista(
    crearNuevoJugadorCategoriaTorneo,
    controladorRedireccionar,
    [idCategoriaTorneo]
  );

  const fechas = [];

  for (let dato of datosTablaCategoriaTorneo) {
    if (!fechas.includes(dato.fecha)) {
      fechas.push(dato.fecha);
    }
  }

  if (jugadoresDeLaCategoriaTorneo.length === 0) {
    return (
      <>
        <AdminTituloPagina titulo="Tabla del torneo" />
        <p>No hay jugadores registrados aún en esta categoría</p>
        {jsxCrearJugador(jugadores)}
      </>
    );
  }

  const puntajesTotales = [];

  for (let dato of datosTablaCategoriaTorneo) {
    const { id_jugador } = dato;
    if (puntajesTotales[id_jugador] !== undefined) {
      puntajesTotales[id_jugador] += dato.puntaje;
    } else {
      puntajesTotales[id_jugador] = dato.puntaje;
    }
  }

  return (
    <>
      <AdminTituloPagina titulo="Tabla del torneo" />

      <form className={classes.posiciones}>
        <table className={classes.table} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th
                rowSpan="2"
                className={`${classes['border-bottom']} ${classes['vertical-align-bottom']}`}
              >
                Pos
              </th>
              <th
                rowSpan="2"
                className={`${classes['border-bottom']} ${classes['vertical-align-bottom']}`}
              >
                Jugador
              </th>
              <th
                rowSpan="2"
                className={`${classes['border-bottom']} ${classes['vertical-align-bottom']}`}
              >
                Puntaje Total
              </th>
              {fechas.map((fecha) => (
                <th
                  key={fecha}
                  className={`${classes['border-right']} ${classes['border-left']} ${classes['border-bottom-dashed']}`}
                  colSpan="2"
                >
                  {fecha}
                </th>
              ))}
              <th
                rowSpan="2"
                className={`${classes['border-bottom']} ${classes['vertical-align-bottom']}`}
              >
                Eliminar
              </th>
            </tr>
            <tr>
              {fechas.map((fecha, i) => (
                <>
                  <th
                    key={i}
                    className={`${classes['border-right-light']} ${classes['border-left']} ${classes['border-bottom']}`}
                  >
                    Pos
                  </th>
                  <th
                    key={-i}
                    className={`${classes['border-right']} ${classes['border-bottom']}`}
                  >
                    Pts
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {jugadoresDeLaCategoriaTorneo.map((jugador) => (
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
                      name={`puntaje_total-${jugador.id}`}
                      defaultValue={jugador.puntaje_total}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : jugador.puntaje_total ? (
                    jugador.puntaje_total
                  ) : (
                    '-'
                  )}
                </td>
                {fechas.map((fecha, i) =>
                  datosTablaCategoriaTorneo.filter(
                    (dato) =>
                      dato.id_jugador === jugador.id_jugador &&
                      dato.fecha === fecha
                  ).length > 0 ? (
                    <>
                      <td
                        key={i}
                        className={`${classes['border-right-light']} ${classes['border-left']}`}
                      >
                        {
                          datosTablaCategoriaTorneo.filter(
                            (dato) =>
                              dato.id_jugador === jugador.id_jugador &&
                              dato.fecha === fecha
                          )[0].posicion
                        }
                      </td>
                      <td key={-i} className={classes['border-right']}>
                        {Math.abs(
                          datosTablaCategoriaTorneo.filter(
                            (dato) =>
                              dato.id_jugador === jugador.id_jugador &&
                              dato.fecha === fecha
                          )[0].puntaje
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        key={i}
                        className={`${classes['border-right-light']} ${classes['border-left']}`}
                      ></td>
                      <td key={-i} className={classes['border-right']}></td>
                    </>
                  )
                )}
                <td role="cell" data-cell="eliminar">
                  <button
                    type="button"
                    className={classes['btn-eliminar']}
                    onClick={controladorBorrarJugadorCategoriaTorneo.bind(
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
      </form>

      <div className={classes.acciones}>
        {jsxCrearJugador(jugadores)}

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

export default TablaDelTorneo;
