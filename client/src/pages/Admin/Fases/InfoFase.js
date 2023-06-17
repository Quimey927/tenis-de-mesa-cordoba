import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaGrupos from '../../../components/Admin/Grupos/ListaGrupos';
import ListaEliminatorias from '../../../components/Admin/Eliminatorias/ListaEliminatorias';
import { obtenerFase, obtenerGrupos, obtenerEliminatorias } from '../../../api';

const PaginaInfoFase = () => {
  const {
    fase,
    grupos,
    eliminatorias,
    idCategoriaFecha,
    idFecha,
    idTorneo,
    idFase,
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

  console.log(grupos);

  return (
    <>
      <AdminInfo titulo={nombre} campos={campos} to="../.." />

      {tipo === 'G' ? (
        <ListaGrupos
          grupos={grupos}
          idCategoriaFecha={idCategoriaFecha}
          idTorneo={idTorneo}
          idFase={idFase}
          idFecha={idFecha}
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
  };
}
