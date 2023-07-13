import { useState } from 'react';

const useGestionarEstadoFilas = (
  filas,
  editarFila,
  controladorRedireccionar,
  borrarElemento
) => {
  const [filasEditandose, setFilasEditandose] = useState(false);
  const [nuevasFilas, setNuevasFilas] = useState(filas);

  const controladorEditarFilas = async () => {
    if (filasEditandose) {
      for (let fila of nuevasFilas) {
        await editarFila(fila);
      }
      setFilasEditandose(false);
      setNuevasFilas(null);
      controladorRedireccionar();
    } else {
      setFilasEditandose(true);
      setNuevasFilas(filas);
    }
  };

  const controladorCambiarValorFila = (evt) => {
    setNuevasFilas((filasPrevias) => {
      let nuevasFilas = [...filasPrevias];
      const [dato, idFila] = evt.target.name.split('-');
      nuevasFilas.filter((fila) => fila.id === +idFila)[0][dato] =
        evt.target.value !== '' ? +evt.target.value : null;
      return nuevasFilas;
    });
  };

  const controladorBorrarElemento = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el elemento?'
    );

    if (continuar) {
      borrarElemento(id);
      controladorRedireccionar();
    }
  };

  return {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
    controladorBorrarElemento,
    nuevasFilas,
  };
};

export default useGestionarEstadoFilas;
