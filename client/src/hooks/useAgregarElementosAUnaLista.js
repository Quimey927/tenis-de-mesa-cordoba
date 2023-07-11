import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import { obtenerNombreCompleto } from '../utils/obtenerNombreCompleto';

const useAgregarElementosAUnaLista = (
  crearNuevoElementoEnArray,
  controladorRedireccionar,
  parametros
) => {
  const [nuevoElemento, setNuevoElemento] = useState(null);
  const [agregandoNuevoElemento, setAgregandoNuevoElemento] = useState(false);

  const controladorCerrarAgregarElemento = () => {
    setNuevoElemento(null);
    setAgregandoNuevoElemento(false);
  };

  const controladorCambiarNuevoElemento = (evt) => {
    setNuevoElemento(+evt.target.value);
  };

  const controladorAgregarNuevoElemento = () => {
    if (!agregandoNuevoElemento) {
      setAgregandoNuevoElemento(true);
    } else {
      crearNuevoElementoEnArray(nuevoElemento, ...parametros);
      setNuevoElemento(null);
      setAgregandoNuevoElemento(false);
      controladorRedireccionar();
    }
  };

  const jsxCrearJugador = (jugadores) => (
    <div className="crear-jugador">
      <button
        type="button"
        className="crear-jugador--button"
        onClick={controladorAgregarNuevoElemento}
      >
        {!agregandoNuevoElemento ? (
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span> Agregar Jugador</span>
          </>
        ) : (
          <FontAwesomeIcon icon={faSave} />
        )}
      </button>
      {agregandoNuevoElemento && (
        <>
          <select
            name="jugador"
            onChange={controladorCambiarNuevoElemento}
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

          <button type="button" onClick={controladorCerrarAgregarElemento}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      )}
    </div>
  );

  return {
    jsxCrearJugador,
  };
};

export default useAgregarElementosAUnaLista;
