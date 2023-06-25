import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightLeft,
  faPenToSquare,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

import { intercambiarJugadoresPartido, editarPartido } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './ListaPartidosYSets.module.css';

const ListaPartidos = ({
  partidosDelGrupo,
  setIdPartidoSetsEditandose,
  setJugador1,
  setJugador2,
  setOrdenPartido,
}) => {
  const [idPartidoEditandose, setIdPartidoEditandose] = useState(null);
  const [partidoEditandose, setPartidoEditandose] = useState(null);

  useEffect(() => {
    const partidoEncontrado = partidosDelGrupo.find(
      (partido) => partido.id === idPartidoEditandose
    );

    setPartidoEditandose(partidoEncontrado);
  }, [idPartidoEditandose, partidosDelGrupo]);

  const controladorEditarPartido = (id) => {
    if (id === idPartidoEditandose) {
      editarPartido(partidoEditandose);
      setIdPartidoEditandose(null);
    } else {
      setIdPartidoEditandose(id);
    }
  };

  const controladorCambiarValorPartido = (evt) => {
    setPartidoEditandose((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value,
      };
      return nuevoEstado;
    });
  };

  const controladorSetearSetsEditandose = (
    idPartido,
    jugador_1,
    jugador_2,
    orden
  ) => {
    setIdPartidoSetsEditandose(idPartido);
    setJugador1(jugador_1);
    setJugador2(jugador_2);
    setOrdenPartido(orden);
  };

  const controladorIntercambiarJugadores = (idPartido) => {
    intercambiarJugadoresPartido(idPartido);
  };

  return (
    <form className={classes.partidos}>
      <table className={classes.table} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Editar</th>
            <th>Jugador 1</th>
            <th style={{ width: '110px' }}>vs.</th>
            <th>Jugador 2</th>
            <th style={{ width: '80px' }}>Intercambiar</th>
          </tr>
        </thead>
        <tbody>
          {partidosDelGrupo.map((partido) => (
            <tr key={partido.id}>
              <td>
                {partido.id === idPartidoEditandose ? (
                  <input
                    name="orden"
                    defaultValue={partido.orden}
                    className={classes['input-tabla-numero']}
                    onChange={controladorCambiarValorPartido}
                  />
                ) : (
                  partido.orden
                )}
              </td>
              <td>
                <button
                  type="button"
                  className={classes['btn-editar-guardar']}
                  onClick={controladorEditarPartido.bind(null, partido.id)}
                >
                  {partido.id === idPartidoEditandose ? (
                    <FontAwesomeIcon icon={faSave} />
                  ) : (
                    <FontAwesomeIcon icon={faPenToSquare} />
                  )}
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
                {partido.id === idPartidoEditandose ? (
                  <>
                    <input
                      name="sets_jugador_1"
                      defaultValue={partido.sets_jugador_1}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorPartido}
                    />
                    <span>-</span>
                    <input
                      name="sets_jugador_2"
                      defaultValue={partido.sets_jugador_2}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorPartido}
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
                      ),
                      partido.orden
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
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default ListaPartidos;
