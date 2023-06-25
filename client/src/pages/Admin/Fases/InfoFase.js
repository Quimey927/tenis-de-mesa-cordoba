import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import Grupos from '../../../components/Admin/Grupos/Grupos';
import ListaEliminatorias from '../../../components/Admin/Eliminatorias/ListaEliminatorias';
import {
  obtenerFase,
  obtenerGrupos,
  obtenerEliminatorias,
  obtenerJugadores,
} from '../../../api';

const PaginaInfoFase = () => {
  const {
    fase,
    grupos,
    eliminatorias,
    idCategoriaFecha,
    idFecha,
    idTorneo,
    idFase,
    jugadores,
  } = useLoaderData();

  const { nombre, orden, tipo } = fase[0];

  const campos = [
    {
      nombre: 'Nombre',
      valor: nombre,
    },
    {
      nombre: 'Orden',
      valor: orden,
    },
    {
      nombre: 'Tipo',
      valor: tipo === 'G' ? 'Grupos' : 'Eliminatoria',
    },
  ];

  return (
    <>
      <AdminInfo titulo={nombre} campos={campos} to="../.." />

      {tipo === 'G' ? (
        <Grupos
          grupos={grupos}
          idCategoriaFecha={idCategoriaFecha}
          idTorneo={idTorneo}
          idFase={idFase}
          idFecha={idFecha}
          jugadores={jugadores}
        />
      ) : (
        <ListaEliminatorias
          eliminatorias={eliminatorias}
          idCategoriaFecha={idCategoriaFecha}
          idTorneo={idTorneo}
          idFase={idFase}
          idFecha={idFecha}
        />
      )}
    </>
  );
};

export default PaginaInfoFase;

export async function loader({ params }) {
  const { idFase, idCategoriaFecha, idFecha, idTorneo } = params;

  return {
    fase: await obtenerFase(idFase),
    grupos: await obtenerGrupos(idFase),
    eliminatorias: await obtenerEliminatorias(idFase),
    idFase,
    idCategoriaFecha,
    idFecha,
    idTorneo,
    jugadores: await obtenerJugadores(),
  };
}
