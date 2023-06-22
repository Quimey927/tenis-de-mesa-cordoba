import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faSave,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { encontrarColorFila } from '../../../utils/funcionesColorFila';
import {
  editarFilaTabla,
  editarColorTabla,
  borrarColorTabla,
  crearColorTabla,
} from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import { datosTabla } from '../../../constants/datosTabla';
import classes from './TablaPosiciones.module.css';

const TablaPosiciones = ({
  filasTabla,
  coloresTabla,
  setDummyEstado,
  idGrupo,
  coloresFila,
}) => {
  const [idFilaEditandose, setIdFilaEditandose] = useState(null);
  const [idColorEditandose, setIdColorEditandose] = useState(null);
  const [filaEditandose, setFilaEditandose] = useState(null);
  const [colorEditandose, setColorEditandose] = useState(null);
  const [agregandoNuevoColor, setAgregandoNuevoColor] = useState(false);
  const [nuevoColor, setNuevoColor] = useState({
    posiciones: '',
    color: '',
    nota: '',
  });

  const controladorEditarFilaTabla = (id) => {
    if (id === idFilaEditandose) {
      editarFilaTabla(filaEditandose);
      setIdFilaEditandose(null);
      setDummyEstado((estadoPrevio) => !estadoPrevio);
    } else {
      setIdFilaEditandose(id);
    }
  };

  const controladorEditarColorTabla = (id) => {
    if (id === idColorEditandose) {
      editarColorTabla(colorEditandose);
      setIdColorEditandose(null);
      setDummyEstado((estadoPrevio) => !estadoPrevio);
    } else {
      setIdColorEditandose(id);
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

  const controladorCambiarValorColor = (evt) => {
    setColorEditandose((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value,
      };
      return nuevoEstado;
    });
  };

  const controladorCambiarValorNuevoColor = (evt) => {
    setNuevoColor((estadoPrevio) => {
      let nuevoEstado = {
        ...estadoPrevio,
        [evt.target.name]: evt.target.value,
      };
      return nuevoEstado;
    });
  };

  const controladorBorrarColorTabla = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el color?'
    );

    if (continuar) {
      borrarColorTabla(id);
      setDummyEstado((estadoPrevio) => !estadoPrevio);
    }
  };

  const controladorCerrarEditarColor = () => {
    setIdColorEditandose(null);
  };

  const controladorCerrarAgregarColor = () => {
    setNuevoColor({ posiciones: '', color: '', nota: '' });
    setAgregandoNuevoColor(false);
  };

  const controladorAgregarNuevoColor = () => {
    if (!agregandoNuevoColor) {
      setAgregandoNuevoColor(true);
    } else {
      crearColorTabla(nuevoColor, idGrupo);
      setNuevoColor({ posiciones: '', color: '', nota: '' });
      setAgregandoNuevoColor(false);
      setDummyEstado((estadoPrevio) => !estadoPrevio);
    }
  };

  useEffect(() => {
    const filaEncontrada = filasTabla.find(
      (fila) => fila.id === idFilaEditandose
    );

    setFilaEditandose(filaEncontrada);
  }, [idFilaEditandose, filasTabla]);

  useEffect(() => {
    const colorEncontrado = coloresTabla.find(
      (color) => color.id === idColorEditandose
    );

    setColorEditandose(colorEncontrado);
  }, [idColorEditandose, coloresTabla]);

  return (
    <>
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

        <div>
          {coloresTabla.map((color) => (
            <div className={classes.color} key={color.id}>
              <button
                type="button"
                className={classes['btn']}
                onClick={controladorEditarColorTabla.bind(null, color.id)}
              >
                {color.id === idColorEditandose ? (
                  <FontAwesomeIcon icon={faSave} />
                ) : (
                  <FontAwesomeIcon icon={faPenToSquare} />
                )}
              </button>
              {color.id === idColorEditandose ? (
                <>
                  <input
                    className={classes['input-posiciones']}
                    name="posiciones"
                    required={true}
                    onChange={controladorCambiarValorColor}
                    defaultValue={color.posiciones}
                    placeholder="Posiciones..."
                  />
                  <select
                    name="color"
                    onChange={controladorCambiarValorColor}
                    defaultValue={color.color}
                    required={true}
                  >
                    <option value="">Elegir color</option>
                    <option value="verde">Verde</option>
                    <option value="verde2">Verde 2</option>
                    <option value="dorado">Dorado</option>
                    <option value="bronce">Bronce</option>
                    <option value="rojo2">Rojo</option>
                    <option value="celeste">Celeste</option>
                    <option value="celeste2">Celeste 2</option>
                    <option value="amarillo">Amarillo</option>
                    <option value="plateado">Plateado</option>
                  </select>
                  <input
                    name="nota"
                    onChange={controladorCambiarValorColor}
                    required={true}
                    defaultValue={color.nota}
                    placeholder="Nota..."
                  />
                  <button
                    type="button"
                    className={classes['btn']}
                    onClick={controladorCerrarEditarColor}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={classes.box}
                    style={{
                      backgroundColor: `var(--color-${color.color})`,
                    }}
                  ></div>
                  <div>{color.nota}</div>
                  <button
                    type="button"
                    className={classes['btn']}
                    onClick={controladorBorrarColorTabla.bind(null, color.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          ))}

          <div>
            <button
              type="button"
              className={classes['btn']}
              onClick={controladorAgregarNuevoColor}
            >
              {!agregandoNuevoColor ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
            </button>
            {agregandoNuevoColor && (
              <>
                <input
                  name="posiciones"
                  className={classes['input-posiciones']}
                  required={true}
                  onChange={controladorCambiarValorNuevoColor}
                  placeholder="Posiciones..."
                />
                <select
                  name="color"
                  onChange={controladorCambiarValorNuevoColor}
                  required={true}
                >
                  <option value="">Elegir color</option>
                  <option value="verde">Verde</option>
                  <option value="verde2">Verde 2</option>
                  <option value="dorado">Dorado</option>
                  <option value="bronce">Bronce</option>
                  <option value="rojo2">Rojo</option>
                  <option value="celeste">Celeste</option>
                  <option value="celeste2">Celeste 2</option>
                  <option value="amarillo">Amarillo</option>
                  <option value="plateado">Plateado</option>
                </select>
                <input
                  name="nota"
                  onChange={controladorCambiarValorNuevoColor}
                  required={true}
                  placeholder="Nota..."
                />
                <button
                  type="button"
                  className={classes['btn']}
                  onClick={controladorCerrarAgregarColor}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default TablaPosiciones;
