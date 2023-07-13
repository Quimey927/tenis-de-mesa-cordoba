import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CrearPartidos from './CrearPartidos';
import ListaPartidos from '../ListaPartidos';
import ListaSets from '../ListaSets';
import { agregarJugadoresACategoriaFecha } from '../../../api';

const ListaEliminatorias = ({
  idFecha,
  categoriaFecha,
  idCategoriaFecha,
  idFase,
  idEliminatoria,
  partidosDeLaEliminatoria,
  sets,
  jugadores,
  jugadoresDeLaCategoriaFecha,
}) => {
  const [mostrarSets, setMostrarSets] = useState(false);

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

  const agregarJugadoresALaCategoriaFecha = async (nuevasFilas) => {
    let jugadoresPartidos = [];

    if (nuevasFilas) {
      jugadoresPartidos = [
        ...nuevasFilas
          .map((fila) => fila.id_jugador_1)
          .filter((fila) => fila !== null),
        ...nuevasFilas
          .map((fila) => fila.id_jugador_2)
          .filter((fila) => fila !== null),
      ];
    }

    if (jugadoresPartidos) {
      const nuevosJugadores = jugadoresPartidos.filter(
        (jugador) =>
          jugador > 0 && !jugadoresDeLaCategoriaFecha.includes(jugador)
      );

      if (nuevosJugadores.length > 0) {
        await agregarJugadoresACategoriaFecha(
          nuevosJugadores,
          idCategoriaFecha,
          categoriaFecha[0].id_categoria_torneo_default
        );
      }
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
      ) : !mostrarSets ? (
        <>
          <ListaPartidos
            idEliminatoria={+idEliminatoria}
            partidosDeLaEliminatoria={partidosDeLaEliminatoria}
            controladorRedireccionar={controladorRedireccionar}
            jugadores={jugadores}
            dia={categoriaFecha[0].dia.substring(0, 10)}
            setMostrarSets={setMostrarSets}
            agregarJugadoresALaCategoriaFecha={
              agregarJugadoresALaCategoriaFecha
            }
          />
        </>
      ) : (
        <>
          <ListaSets
            sets={sets}
            partidosDeLaEtapa={partidosDeLaEliminatoria}
            controladorRedireccionar={controladorRedireccionar}
            setMostrarSets={setMostrarSets}
          />
        </>
      )}
    </>
  );
};

export default ListaEliminatorias;
