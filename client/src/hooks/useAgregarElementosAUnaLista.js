import { useState } from 'react';

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

  return {
    controladorCerrarAgregarElemento,
    controladorCambiarNuevoElemento,
    controladorAgregarNuevoElemento,
    agregandoNuevoElemento,
  };
};

export default useAgregarElementosAUnaLista;
