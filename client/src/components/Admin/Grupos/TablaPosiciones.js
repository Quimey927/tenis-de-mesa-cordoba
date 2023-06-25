import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons';

import { encontrarColorFila } from '../../../utils/funcionesColorFila';
import { editarFilaTabla, obtenerFilasTabla } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import { datosTabla } from '../../../constants/datosTabla';
import classes from './TablaPosiciones.module.css';

const TablaPosiciones = ({
  filasTabla,
  coloresTabla,
  idGrupoActivo,
  setFilasTabla,
  coloresFila,
}) => {
  const [idFilaEditandose, setIdFilaEditandose] = useState(null);
  const [filaEditandose, setFilaEditandose] = useState(null);

  const controladorEditarFilaTabla = (id) => {
    if (id === idFilaEditandose) {
      editarFilaTabla(filaEditandose);
      setIdFilaEditandose(null);
      obtenerFilasTabla(idGrupoActivo, setFilasTabla);
    } else {
      setIdFilaEditandose(id);
    }
  };

  const controladorCambiarValorFila = (evt) => {
    setFilaEditandose((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value,
      };
      return nuevoEstado;
    });
  };

  useEffect(() => {
    const filaEncontrada = filasTabla.find(
      (fila) => fila.id === idFilaEditandose
    );

    setFilaEditandose(filaEncontrada);
  }, [idFilaEditandose, filasTabla]);

  return (
    <form className={classes.form}>
      <table className={classes.tabla} style={{ width: '100%' }}>
        <thead>
          <tr className={classes.row}>
            <th style={{ width: '50px' }}>Pos.</th>
            <th className={classes['celda-ancha']}>Jugador</th>
            {datosTabla.map((dato) => (
              <th key={dato.codigo} style={{ width: '50px' }}>
                {dato.codigo.toUpperCase()}
              </th>
            ))}
            <th style={{ width: '50px' }}></th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.length > 0 &&
            filasTabla.map((fila) => (
              <tr
                key={fila.id}
                className={classes.row}
                style={{
                  backgroundColor:
                    encontrarColorFila(coloresFila, fila.posicion) !== 'none'
                      ? `var(--color-${encontrarColorFila(
                          coloresFila,
                          fila.posicion
                        )}`
                      : 'none',
                }}
              >
                <td style={{ width: '50px' }}>
                  {fila.id === idFilaEditandose ? (
                    <input
                      name="posicion"
                      defaultValue={fila.posicion}
                      className={classes['input-tabla-numero']}
                      onChange={controladorCambiarValorFila}
                    />
                  ) : (
                    fila.posicion
                  )}
                </td>
                <td key={fila.id} className={classes['celda-ancha']}>
                  {obtenerNombreCompleto(
                    fila.nombre,
                    fila.segundo_nombre,
                    fila.apellido,
                    fila.segundo_apellido
                  )}
                </td>
                {datosTabla.map((dato, i) => (
                  <td key={i} style={{ width: '50px' }}>
                    {fila.id === idFilaEditandose ? (
                      <input
                        name={dato.codigo}
                        defaultValue={fila[dato.codigo]}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorFila}
                      />
                    ) : (
                      fila[dato.codigo]
                    )}
                  </td>
                ))}
                <td style={{ width: '50px' }}>
                  <button
                    type="button"
                    className={classes['btn']}
                    onClick={controladorEditarFilaTabla.bind(null, fila.id)}
                  >
                    {fila.id === idFilaEditandose ? (
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

export default TablaPosiciones;
