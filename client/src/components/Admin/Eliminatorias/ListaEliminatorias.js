import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CrearPartidos from './CrearPartidos';
import ListaPartidos from './ListaPartidos';
import ListaSets from './ListaSets';

const ListaEliminatorias = ({
  idFecha,
  categoriaFecha,
  idCategoriaFecha,
  idFase,
  idEliminatoria,
  partidosDeLaEliminatoria,
  idPartido,
  setsDelPartido,
  jugadores,
  jugadoresDeLaCategoriaFecha,
}) => {
  const [jugador1, setJugador1] = useState('');
  const [jugador2, setJugador2] = useState('');

  const navigate = useNavigate();

  const controladorRedireccionar = (
    id_eliminatoria = idEliminatoria,
    id_partido = null
  ) => {
    if (!id_partido) {
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/eliminatoria/${id_eliminatoria}`
      );
    } else {
      navigate(
        `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/eliminatoria/${id_eliminatoria}/partido/${id_partido}`
      );
    }
  };

  return (
    <>
      {!idEliminatoria || partidosDeLaEliminatoria.length === 0 ? (
        <CrearPartidos
          idFase={idFase}
          dia={categoriaFecha[0].dia.substring(0, 10)}
          controladorRedireccionar={controladorRedireccionar}
        />
      ) : !idPartido ? (
        <>
          <ListaPartidos
            idEliminatoria={+idEliminatoria}
            partidosDeLaEliminatoria={partidosDeLaEliminatoria}
            setJugador1={setJugador1}
            setJugador2={setJugador2}
            controladorRedireccionar={controladorRedireccionar}
            jugadores={jugadores}
            jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
            categoriaFecha={categoriaFecha}
            idCategoriaFecha={idCategoriaFecha}
          />
        </>
      ) : (
        <>
          <ListaSets
            idEliminatoria={idEliminatoria}
            idPartido={idPartido}
            setsDelPartido={setsDelPartido}
            jugador1={jugador1}
            jugador2={jugador2}
            setJugador1={setJugador1}
            setJugador2={setJugador2}
            controladorRedireccionar={controladorRedireccionar}
          />
        </>
      )}
    </>
  );
};

export default ListaEliminatorias;
