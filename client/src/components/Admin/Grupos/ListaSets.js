import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import {
  editarPartido,
  editarSet,
  crearSet,
  borrarSet,
  editarFilaTabla,
} from '../../../api';
import classes from './ListaPartidosYSets.module.css';
import { calcularNuevasFilas } from '../../../utils/calcularNuevasFilas';

const ListaSets = ({
  setsPartido,
  jugador1,
  jugador2,
  setJugador1,
  setJugador2,
  idPartidoSetsEditandose,
  setIdPartidoSetsEditandose,
  filasTabla,
  partidosDelGrupo,
  ordenPartido,
  setOrdenPartido,
}) => {
  const [idSetEditandose, setIdSetEditandose] = useState(null);
  const [setEditandose, setSetEditandose] = useState(null);

  useEffect(() => {
    const setEncontrado = setsPartido.find((set) => set.id === idSetEditandose);

    setSetEditandose(setEncontrado);
  }, [idSetEditandose, setsPartido]);

  const controladorCrearSet = () => {
    crearSet(idPartidoSetsEditandose, setsPartido.length);
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
    }
  };

  const controladorEditarSet = (id) => {
    if (id === idSetEditandose) {
      editarSet(setEditandose);
      setIdSetEditandose(null);
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

    editarPartido({
      orden: ordenPartido,
      sets_jugador_1,
      sets_jugador_2,
      id: idPartidoSetsEditandose,
    });

    const nuevasFilasTabla = calcularNuevasFilas(filasTabla, partidosDelGrupo);

    // el .entries() retorna un nuevo array con los pares [index, valorDelArray], y con ES6 destructuramos
    for (let [i, fila] of nuevasFilasTabla.entries()) {
      fila.posicion = i + 1;
      editarFilaTabla(fila);
    }

    setIdPartidoSetsEditandose(null);
    setJugador1(null);
    setJugador2(null);
    setOrdenPartido(null);
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
};

export default ListaSets;
