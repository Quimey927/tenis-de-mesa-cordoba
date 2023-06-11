import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaCategoriasTorneo from '../../../components/Admin/CategoriasTorneo/ListaCategoriasTorneo';
import ListaFechasTorneo from '../../../components/Admin/Fechas/ListaFechasTorneo';
import {
  obtenerTorneo,
  obtenerCategoriasTorneo,
  obtenerFechasTorneo,
} from '../../../api';

const PaginaInfoTorneo = () => {
  const { torneo, categoriasTorneo, fechasTorneo } = useLoaderData();

  const campos = [
    {
      nombre: 'Título',
      valor: torneo[0].titulo,
    },
    {
      nombre: 'Temporada',
      valor: torneo[0].temporada,
    },
    {
      nombre: 'Año',
      valor: torneo[0].año,
    },
    {
      nombre: 'Descripción',
      valor: torneo[0].descripcion,
    },
  ];

  return (
    <>
      <AdminInfo
        titulo={torneo[0].titulo}
        campos={campos}
        imagen={torneo[0].imagen_torneo}
      />

      <ListaCategoriasTorneo
        categoriasTorneo={categoriasTorneo ? categoriasTorneo : []}
        navegarA={`/admin/torneos/${torneo[0].id}`}
      />

      <ListaFechasTorneo
        fechasTorneo={fechasTorneo ? fechasTorneo : []}
        navegarA={`/admin/torneos/${torneo[0].id}`}
        state={torneo[0].id}
      />
    </>
  );
};

export default PaginaInfoTorneo;

export async function loader({ params }) {
  const { idTorneo } = params;

  return {
    torneo: await obtenerTorneo(idTorneo),
    categoriasTorneo: idTorneo ? await obtenerCategoriasTorneo(idTorneo) : null,
    fechasTorneo: idTorneo ? await obtenerFechasTorneo(idTorneo) : null,
  };
}
