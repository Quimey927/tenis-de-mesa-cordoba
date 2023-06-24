import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightLeft,
  faPenToSquare,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import {
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarPartido,
  obtenerSets,
  editarSet,
  crearSet,
  borrarSet,
  editarFilaTabla,
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
  const [idPartidoSetsEditandose, setIdPartidoSetsEditandose] = useState(null);
  const [idSetEditandose, setIdSetEditandose] = useState(null);
  const [setEditandose, setSetEditandose] = useState(null);
  const [setsPartido, setSetsPartido] = useState([]);
  const [jugador1, setJugador1] = useState('');
  const [jugador2, setJugador2] = useState('');

  useEffect(() => {
    if (idPartidoSetsEditandose) {
      obtenerSets(idPartidoSetsEditandose, setSetsPartido);
    }
  }, [idPartidoSetsEditandose]);

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

  const controladorCambiarValorSet = (evt) => {
    setSetEditandose((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value,
      };
      return nuevoEstado;
    });
  };

  const controladorSetearSetsEditandose = (idPartido, jugador_1, jugador_2) => {
    setIdPartidoSetsEditandose(idPartido);
    setIdPartidoEditandose(idPartido);
    setJugador1(jugador_1);
    setJugador2(jugador_2);
  };

  const controladorBorrarSet = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el set?'
    );

    if (continuar) {
      borrarSet(id);
      obtenerSets(idPartidoSetsEditandose, setSetsPartido);
    }
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

  const controladorEditarSet = (id) => {
    if (id === idSetEditandose) {
      editarSet(setEditandose);
      setIdSetEditandose(null);
      obtenerSets(idPartidoSetsEditandose, setSetsPartido);
    } else {
      setIdSetEditandose(id);
    }
  };

  const controladorTerminarEdicionSets = () => {
    let sets_jugador_1 = 0;
    let sets_jugador_2 = 0;
    for (let set of setsPartido) {
      set.puntos_jugador_1 > set.puntos_jugador_2 && sets_jugador_1++;
      set.puntos_jugador_1 < set.puntos_jugador_2 && sets_jugador_2++;
    }

    const { orden, id } = partidoEditandose;

    editarPartido({ orden, sets_jugador_1, sets_jugador_2, id });
    setDummyEstado((estadoPrevio) => !estadoPrevio);

    const nuevasFilasTabla = [...filasTabla];

    for (let fila of nuevasFilasTabla) {
      fila.pj = 0;
      fila.pg = 0;
      fila.pp = 0;
      fila.sf = 0;
      fila.sc = 0;
      fila.pf = 0;
      fila.pc = 0;

      for (let partido of partidosDelGrupo) {
        if (partido.sets_jugador_1 !== 0 || partido.sets_jugador_2 !== 0) {
          if (fila.id_jugador === partido.id_jugador_1) {
            fila.pj++;
            fila.sf += partido.sets_jugador_1;
            fila.sc += partido.sets_jugador_2;
            partido.sets_jugador_1 > partido.sets_jugador_2
              ? fila.pg++
              : fila.pp++;
            fila.pf += +partido.puntos_jugador_1;
            fila.pc += +partido.puntos_jugador_2;
          }

          if (fila.id_jugador === partido.id_jugador_2) {
            fila.pj++;
            fila.sf += partido.sets_jugador_2;
            fila.sc += partido.sets_jugador_1;
            partido.sets_jugador_2 > partido.sets_jugador_1
              ? fila.pg++
              : fila.pp++;
            fila.pf += +partido.puntos_jugador_2;
            fila.pc += +partido.puntos_jugador_1;
          }
        }
      }
    }

    nuevasFilasTabla.sort((a, b) => {
      if (a.pg === b.pg) {
        const a_cs = a.sf / a.sc;
        const b_cs = b.sf / b.sc;
        if (a_cs === b_cs) {
          const a_cp = a.pf / a.pc;
          const b_cp = b.pf / b.pc;
          return a_cp > b_cp ? -1 : 1;
        } else {
          return a_cs > b_cs ? -1 : 1;
        }
      } else {
        return a.pg > b.pg ? -1 : 1;
      }
    });

    // el .entries() retorna un nuevo array con los pares [index, valorDelArray], y con ES6 destructuramos
    for (let [i, fila] of nuevasFilasTabla.entries()) {
      fila.posicion = i + 1;
      console.log(nuevasFilasTabla[i]);
      console.log(fila);
      editarFilaTabla(fila);
    }

    setIdPartidoSetsEditandose(null);
    setIdPartidoEditandose(null);
    setJugador1(null);
    setJugador2(null);
  };

  useEffect(() => {
    const setEncontrado = setsPartido.find((set) => set.id === idSetEditandose);

    setSetEditandose(setEncontrado);
  }, [idSetEditandose, setsPartido]);

  const controladorCrearSet = () => {
    crearSet(idPartidoSetsEditandose, setsPartido.length);
    obtenerSets(idPartidoSetsEditandose, setSetsPartido);
  };

  if (partidosDelGrupo.length === 0) {
    return (
      <button className={classes.btn} onClick={controladorCrearPartidos}>
        Crear Partidos
      </button>
    );
  }

  if (idPartidoSetsEditandose) {
    return (
      <>
        <form className={classes.partidos}>
          <table className={classes.table} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>N° Set</th>
                <th>Editar</th>
                <th>{jugador1}</th>
                <th>vs.</th>
                <th>{jugador2}</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {setsPartido.map((set) => (
                <tr key={set.id}>
                  <td>
                    {set.id === idSetEditandose ? (
                      <input
                        name="num_set"
                        defaultValue={set.num_set}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorSet}
                      />
                    ) : (
                      set.num_set
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={classes['btn-editar-guardar']}
                      onClick={controladorEditarSet.bind(null, set.id)}
                    >
                      {set.id === idSetEditandose ? (
                        <FontAwesomeIcon icon={faSave} />
                      ) : (
                        <FontAwesomeIcon icon={faPenToSquare} />
                      )}
                    </button>
                  </td>
                  <td>
                    {set.id === idSetEditandose ? (
                      <input
                        name="puntos_jugador_1"
                        defaultValue={set.puntos_jugador_1}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorSet}
                      />
                    ) : (
                      set.puntos_jugador_1
                    )}
                  </td>
                  <td>-</td>
                  <td>
                    {set.id === idSetEditandose ? (
                      <input
                        name="puntos_jugador_2"
                        defaultValue={set.puntos_jugador_2}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorSet}
                      />
                    ) : (
                      set.puntos_jugador_2
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={classes['btn-editar-guardar']}
                      onClick={controladorBorrarSet.bind(null, set.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
            className={classes['btn']}
            onClick={controladorCrearSet}
          >
            Agregar Set
          </button>
          <button
            type="button"
            className={classes['btn']}
            onClick={controladorTerminarEdicionSets}
          >
            Listo
          </button>
        </div>
      </>
    );
  }

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
                      )
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

export default PartidosDelGrupo;
