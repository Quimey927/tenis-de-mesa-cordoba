import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import {
  editarSetsPartido,
  editarSet,
  crearSet,
  borrarSet,
} from '../../../api';
import classes from './ListaPartidosYSets.module.css';

const ListaSets = ({
  idEliminatoria,
  idPartido,
  setsDelPartido,
  jugador1,
  jugador2,
  setJugador1,
  setJugador2,
  controladorRedireccionar,
}) => {
  const [idSetEditandose, setIdSetEditandose] = useState(null);
  const [setEditandose, setSetEditandose] = useState(null);

  useEffect(() => {
    const setEncontrado = setsDelPartido.find(
      (set) => set.id === idSetEditandose
    );

    setSetEditandose(setEncontrado);
  }, [idSetEditandose, setsDelPartido]);

  const controladorCrearSet = () => {
    crearSet(idPartido, setsDelPartido.length);
    controladorRedireccionar(idEliminatoria, idPartido);
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

  const controladorBorrarSet = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el set?'
    );

    if (continuar) {
      borrarSet(id);
      controladorRedireccionar(idEliminatoria, idPartido);
    }
  };

  const controladorEditarSet = (id) => {
    if (id === idSetEditandose) {
      editarSet(setEditandose);
      setIdSetEditandose(null);
      controladorRedireccionar(idEliminatoria, idPartido);
    } else {
      setIdSetEditandose(id);
    }
  };

  const controladorTerminarEdicionSets = () => {
    let sets_jugador_1 = 0;
    let sets_jugador_2 = 0;

    for (let set of setsDelPartido) {
      set.puntos_jugador_1 > set.puntos_jugador_2 && sets_jugador_1++;
      set.puntos_jugador_1 < set.puntos_jugador_2 && sets_jugador_2++;
    }

    editarSetsPartido({
      sets_jugador_1,
      sets_jugador_2,
      id: +idPartido,
    });

    setJugador1(null);
    setJugador2(null);
    controladorRedireccionar();
  };

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
            {setsDelPartido.map((set) => (
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
};

export default ListaSets;
