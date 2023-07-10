import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faSave,
  faTrash,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import {
  editarPosicionYPuntajeCategoriaTorneo,
  borrarJugadorDeCategoriaTorneo,
  crearNuevoJugadorCategoriaTorneo,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './TablaDelTorneo.module.css';

const TablaDelTorneo = ({
  jugadoresDeLaCategoriaTorneo,
  idCategoriaTorneo,
  controladorRedireccionar,
  jugadores,
  datosTablaCategoriaTorneo,
}) => {
  const [idJugadorEditandose, setIdJugadorEditandose] = useState(null);
  const [jugadorEditandose, setJugadorEditandose] = useState(null);
  const [nuevoJugador, setNuevoJugador] = useState(null);
  const [agregandoNuevoJugador, setAgregandoNuevoJugador] = useState(false);

  useEffect(() => {
    const jugadorEncontrado = jugadoresDeLaCategoriaTorneo.find(
      (jugador) => jugador.id === idJugadorEditandose
    );

    setJugadorEditandose(jugadorEncontrado);
  }, [idJugadorEditandose, jugadoresDeLaCategoriaTorneo]);

  const controladorEditarJugador = (id) => {
    if (id === idJugadorEditandose) {
      editarPosicionYPuntajeCategoriaTorneo(jugadorEditandose);
      setIdJugadorEditandose(null);
      controladorRedireccionar();
    } else {
      setIdJugadorEditandose(id);
    }
  };

  const controladorCambiarValorJugador = (evt) => {
    setJugadorEditandose((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value !== '' ? +evt.target.value : null,
      };
      return nuevoEstado;
    });
  };

  const controladorBorrarJugadorCategoriaTorneo = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el jugador de la categoria del torneo?'
    );

    if (continuar) {
      borrarJugadorDeCategoriaTorneo(id);
      controladorRedireccionar();
    }
  };

  const controladorCerrarAgregarJugador = () => {
    setNuevoJugador(null);
    setAgregandoNuevoJugador(false);
  };

  const controladorCambiarNuevoJugador = (evt) => {
    setNuevoJugador(+evt.target.value);
  };

  const controladorAgregarNuevoJugador = () => {
    if (!agregandoNuevoJugador) {
      setAgregandoNuevoJugador(true);
    } else {
      crearNuevoJugadorCategoriaTorneo(nuevoJugador, idCategoriaTorneo);
      setNuevoJugador(null);
      setAgregandoNuevoJugador(false);
      controladorRedireccionar();
    }
  };

  const fechas = [];

  for (let dato of datosTablaCategoriaTorneo) {
    if (!fechas.includes(dato.fecha)) {
      fechas.push(dato.fecha);
    }
  }

  const crearJugador = (
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

  if (datosTablaCategoriaTorneo.length === 0) {
    return (
      <>
        <AdminTituloPagina titulo="Tabla del torneo" />
        <p>No hay jugadores registrados aún en esta categoría</p>
        {crearJugador}
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
                style={{
                  borderBottom: '1px solid #333',
                  verticalAlign: 'bottom',
                }}
              >
                Pos
              </th>
              <th
                rowSpan="2"
                style={{
                  borderBottom: '1px solid #333',
                  verticalAlign: 'bottom',
                }}
              >
                Jugador
              </th>
              <th
                rowSpan="2"
                style={{
                  borderBottom: '1px solid #333',
                  verticalAlign: 'bottom',
                }}
              >
                Puntaje Total
              </th>
              {fechas.map((fecha) => (
                <th
                  key={fecha}
                  style={{
                    borderLeft: '1px solid #333',
                    borderRight: '1px solid #333',
                    borderBottom: '1px dashed #555',
                  }}
                  colSpan="2"
                >
                  {fecha}
                </th>
              ))}
              <th
                rowSpan="2"
                style={{
                  borderBottom: '1px solid #333',
                  verticalAlign: 'bottom',
                }}
              >
                Editar
              </th>
              <th
                rowSpan="2"
                style={{
                  borderBottom: '1px solid #333',
                  verticalAlign: 'bottom',
                }}
              >
                Eliminar
              </th>
            </tr>
            <tr>
              {fechas.map((fecha, i) => (
                <>
                  <th
                    key={i}
                    style={{
                      borderLeft: '1px solid #333',
                      borderBottom: '1px solid #333',
                      borderRight: '1px solid #ccc',
                    }}
                  >
                    Pos
                  </th>
                  <th
                    key={-i}
                    style={{
                      borderRight: '1px solid #333',
                      borderBottom: '1px solid #333',
                    }}
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
                  {jugador.id === idJugadorEditandose ? (
                    <input
                      type="number"
                      name="posicion"
                      defaultValue={jugador.posicion}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorJugador}
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
                <td>{puntajesTotales[jugador.id_jugador]}</td>
                {fechas.map((fecha, i) =>
                  datosTablaCategoriaTorneo.filter(
                    (dato) =>
                      dato.id_jugador === jugador.id_jugador &&
                      dato.fecha === fecha
                  ).length > 0 ? (
                    <>
                      <td
                        key={i}
                        style={{
                          borderLeft: '1px solid #333',
                          borderRight: '1px solid #ccc',
                        }}
                      >
                        {
                          datosTablaCategoriaTorneo.filter(
                            (dato) =>
                              dato.id_jugador === jugador.id_jugador &&
                              dato.fecha === fecha
                          )[0].posicion
                        }
                      </td>
                      <td key={-i} style={{ borderRight: '1px solid #333' }}>
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
                        style={{
                          borderLeft: '1px solid #333',
                          borderRight: '1px solid #ccc',
                        }}
                      ></td>
                      <td
                        key={-i}
                        style={{ borderRight: '1px solid #333' }}
                      ></td>
                    </>
                  )
                )}
                <td>
                  <button
                    type="button"
                    className={classes['btn-editar-guardar']}
                    onClick={controladorEditarJugador.bind(null, jugador.id)}
                  >
                    {jugador.id === idJugadorEditandose ? (
                      <FontAwesomeIcon icon={faSave} />
                    ) : (
                      <FontAwesomeIcon icon={faPenToSquare} />
                    )}
                  </button>
                </td>
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
      {crearJugador}
    </>
  );
};

export default TablaDelTorneo;
