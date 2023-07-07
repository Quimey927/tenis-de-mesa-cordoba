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
  editarPosicionYPuntaje,
  borrarJugadorDeCategoriaFecha,
  crearNuevoJugador,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './PosicionesYPuntajes.module.css';

const PosicionesYPuntajes = ({
  jugadoresDeLaCategoriaFecha,
  controladorRedireccionar,
  categoriaFecha,
  idCategoriaFecha,
  jugadores,
  categoriasTorneoPosibles,
}) => {
  const [idJugadorEditandose, setIdJugadorEditandose] = useState(null);
  const [jugadorEditandose, setJugadorEditandose] = useState(null);
  const [nuevoJugador, setNuevoJugador] = useState(null);
  const [agregandoNuevoJugador, setAgregandoNuevoJugador] = useState(false);

  useEffect(() => {
    const jugadorEncontrado = jugadoresDeLaCategoriaFecha.find(
      (jugador) => jugador.id === idJugadorEditandose
    );

    setJugadorEditandose(jugadorEncontrado);
  }, [idJugadorEditandose, jugadoresDeLaCategoriaFecha]);

  const controladorEditarJugador = (id) => {
    if (id === idJugadorEditandose) {
      editarPosicionYPuntaje(jugadorEditandose);
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

  const controladorBorrarJugadorCategoriaFecha = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el jugador de la categoria de la fecha?'
    );

    if (continuar) {
      borrarJugadorDeCategoriaFecha(id);
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
      crearNuevoJugador(
        nuevoJugador,
        idCategoriaFecha,
        categoriaFecha[0].id_categoria_torneo_default
      );
      setNuevoJugador(null);
      setAgregandoNuevoJugador(false);
      controladorRedireccionar();
    }
  };

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
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {jugadoresDeLaCategoriaFecha.map((jugador) => (
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
                <td>
                  {jugador.id === idJugadorEditandose ? (
                    <input
                      type="number"
                      name="puntaje"
                      defaultValue={jugador.puntaje}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorJugador}
                    />
                  ) : jugador.puntaje ? (
                    jugador.puntaje
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {jugador.id === idJugadorEditandose ? (
                    <select
                      name="id_categoria_torneo"
                      defaultValue={
                        jugador.id_categoria_torneo
                          ? jugador.id_categoria_torneo
                          : ''
                      }
                      onChange={controladorCambiarValorJugador}
                    >
                      <option value="">Sin Categoría Asignada</option>
                      {categoriasTorneoPosibles.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.categoria}
                        </option>
                      ))}
                    </select>
                  ) : (
                    jugador.categoria
                  )}
                </td>
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
      </form>
    </>
  );
};

export default PosicionesYPuntajes;
