import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faSave,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import {
  editarColorTabla,
  borrarColorTabla,
  crearColorTabla,
} from '../../../api';
import { listaColores } from '../../../constants/coloresTabla';
import { obtenerColoresFila } from '../../../utils/funcionesColorFila';
import classes from './ListaColoresTabla.module.css';

const ListaColoresTabla = ({
  coloresTabla,
  idGrupoActivo,
  setColoresTabla,
  setColoresFila,
}) => {
  const [idColorEditandose, setIdColorEditandose] = useState(null);
  const [colorEditandose, setColorEditandose] = useState(null);
  const [agregandoNuevoColor, setAgregandoNuevoColor] = useState(false);
  const [nuevoColor, setNuevoColor] = useState({
    posiciones: '',
    color: '',
    nota: '',
  });

  useEffect(() => {
    const colorEncontrado = coloresTabla.find(
      (color) => color.id === idColorEditandose
    );

    setColorEditandose(colorEncontrado);
  }, [idColorEditandose, coloresTabla]);

  const controladorEditarColorTabla = (id) => {
    if (id === idColorEditandose) {
      if (
        colorEditandose.posiciones.trim() === '' ||
        colorEditandose.color.trim() === '' ||
        colorEditandose.nota.trim() === ''
      ) {
        alert('No dejes campos vacíos');
        return;
      }
      editarColorTabla(colorEditandose);
      setIdColorEditandose(null);
      setColoresFila(obtenerColoresFila(coloresTabla));
    } else {
      setIdColorEditandose(id);
    }
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
      setColoresFila(obtenerColoresFila(coloresTabla));
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
      if (
        nuevoColor.posiciones.trim() === '' ||
        nuevoColor.color.trim() === '' ||
        nuevoColor.nota.trim() === ''
      ) {
        alert('No dejes campos vacíos');
        return;
      }
      crearColorTabla(nuevoColor, idGrupoActivo);
      setNuevoColor({ posiciones: '', color: '', nota: '' });
      setAgregandoNuevoColor(false);
      setColoresFila(obtenerColoresFila(coloresTabla));
    }
  };

  return (
    <form>
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
                  {listaColores.map((color) => (
                    <option key={color.codigoColor} value={color.codigoColor}>
                      {color.texto}
                    </option>
                  ))}
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
                {listaColores.map((color) => (
                  <option key={color.codigoColor} value={color.codigoColor}>
                    {color.texto}
                  </option>
                ))}
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
  );
};

export default ListaColoresTabla;
