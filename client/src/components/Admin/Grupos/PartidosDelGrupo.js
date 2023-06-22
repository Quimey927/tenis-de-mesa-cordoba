import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightLeft,
  faPenToSquare,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

import {
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarPartido,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './PartidosDelGrupo.module.css';

const PartidosDelGrupo = ({
  partidosDelGrupo,
  idGrupo,
  filasTabla,
  dia,
  setDummyEstado,
}) => {
  const [idPartidoEditandose, setIdPartidoEditandose] = useState(null);
  const [partidoEditandose, setPartidoEditandose] = useState(null);

  const controladorEditarPartido = (id) => {
    if (id === idPartidoEditandose) {
      editarPartido(partidoEditandose);
      setIdPartidoEditandose(null);
      setDummyEstado((estadoPrevio) => !estadoPrevio);
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

  useEffect(() => {
    const partidoEncontrado = partidosDelGrupo.find(
      (partido) => partido.id === idPartidoEditandose
    );

    setPartidoEditandose(partidoEncontrado);
  }, [idPartidoEditandose, partidosDelGrupo]);

  const jugadores = [];

  for (let fila of filasTabla) {
    jugadores.push(fila.id_jugador);
  }

  const controladorCrearPartidos = () => {
    const datosPartidos = {
      dia,
      jugadores,
    };

    crearPartidosDelGrupo(idGrupo, datosPartidos);
    setDummyEstado((estadoPrevio) => !estadoPrevio);
  };

  const controladorIntercambiarJugadores = (idPartido) => {
    intercambiarJugadoresPartido(idPartido);
    setDummyEstado((estadoPrevio) => !estadoPrevio);
  };

  if (partidosDelGrupo.length === 0) {
    return (
      <button className={classes.btn} onClick={controladorCrearPartidos}>
        Crear Partidos
      </button>
    );
  }

  return (
    <form className={classes.partidos}>
      <table className={classes.table} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Jugador 1</th>
            <th style={{ width: '110px' }}>vs.</th>
            <th>Jugador 2</th>
            <th style={{ width: '80px' }}>Intercambiar</th>
            <th>Editar</th>
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
                  <Link to={`resultado/${partido.id}`}>
                    {partido.sets_jugador_1} - {partido.sets_jugador_2}
                  </Link>
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
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default PartidosDelGrupo;
