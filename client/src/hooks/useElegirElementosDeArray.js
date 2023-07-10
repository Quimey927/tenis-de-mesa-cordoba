import { useState } from 'react';

import { filtrarArrayTabla } from '../utils/filtrarArrayTabla';

const useElegirElementosDeArray = (elementos, columnas) => {
  const [elementosElegidos, setElementosElegidos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [seMuestranOpciones, setSeMuestranOpciones] = useState(false);

  const controladorEliminarElemento = (id) =>
    setElementosElegidos((jugadoresGrupo) => {
      const nuevosJugadores = jugadoresGrupo.filter((jugador) => {
        return jugador.id !== +id;
      });

      return nuevosJugadores;
    });

  const idElementosElegidos = elementosElegidos.map((jugador) => jugador.id);

  const elementosRestantes = elementos.filter(
    (elemento) => !idElementosElegidos.includes(elemento.id)
  );

  const elementosFiltrados =
    filtro === ''
      ? elementosRestantes
      : filtrarArrayTabla(filtro, elementosRestantes, columnas);

  const controladorAgregarElemento = (id) => {
    const nuevoJugador = elementos.find((elemento) => elemento.id === +id);
    setElementosElegidos((estadoPrevio) => {
      let nuevoEstado = [...estadoPrevio, nuevoJugador];
      return nuevoEstado;
    });

    setFiltro('');

    document.getElementById('input-transparente').focus();
  };

  return {
    elementosElegidos,
    controladorAgregarElemento,
    elementosFiltrados,
    controladorEliminarElemento,
    seMuestranOpciones,
    setSeMuestranOpciones,
    filtro,
    setFiltro,
  };
};

export default useElegirElementosDeArray;
