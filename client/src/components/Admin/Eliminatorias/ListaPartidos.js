import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons';

import { editarPartido } from '../../../api';
import { obtenerEtapaEliminatoria } from '../../../utils/obtenerEtapaEliminatoria';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './ListaPartidosYSets.module.css';

const ListaPartidos = ({
  idGrupo,
  partidosDeLaEliminatoria,
  setJugador1,
  setJugador2,
  controladorRedireccionar,
  jugadores,
}) => {
  const [idPartidoEditandose, setIdPartidoEditandose] = useState(null);
  const [partidoEditandose, setPartidoEditandose] = useState(null);

  useEffect(() => {
    const partidoEncontrado = partidosDeLaEliminatoria.find(
      (partido) => partido.id === idPartidoEditandose
    );

    setPartidoEditandose(partidoEncontrado);
  }, [idPartidoEditandose, partidosDeLaEliminatoria]);

  const controladorEditarPartido = (id) => {
    if (id === idPartidoEditandose) {
      editarPartido(partidoEditandose);
      setIdPartidoEditandose(null);
      controladorRedireccionar();
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

  const controladorSetearSetsEditandose = (idPartido, jugador_1, jugador_2) => {
    setJugador1(jugador_1);
    setJugador2(jugador_2);
    controladorRedireccionar(idGrupo, idPartido);
  };

  return (
    <form className={classes.partidos}>
      <table className={classes.table} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Editar</th>
            <th>Jugador 1</th>
            <th style={{ width: '110px' }}>vs.</th>
            <th>Jugador 2</th>
          </tr>
        </thead>
        <tbody>
          {partidosDeLaEliminatoria.map((partido) => (
            <tr key={partido.id}>
              <td>
                {obtenerEtapaEliminatoria(partido.orden)} ({partido.orden})
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
                {partido.id === idPartidoEditandose ? (
                  <select
                    name="id_jugador_1"
                    defaultValue={
                      partido.id_jugador_1 ? partido.id_jugador_1 : ''
                    }
                    onChange={controladorCambiarValorPartido}
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
                {partido.id === idPartidoEditandose ? (
                  <select
                    name="id_jugador_2"
                    defaultValue={
                      partido.id_jugador_2 ? partido.id_jugador_2 : ''
                    }
                    onChange={controladorCambiarValorPartido}
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
  );
};

export default ListaPartidos;
