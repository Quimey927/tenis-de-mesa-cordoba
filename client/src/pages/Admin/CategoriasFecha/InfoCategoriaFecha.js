import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaFases from '../../../components/Admin/Fases/ListaFases';

import { obtenerCategoriaFecha, obtenerFases } from '../../../api';

const PaginaInfoCategoriaFecha = () => {
  const { categoriaFecha, fases } = useLoaderData();

  const campos = [
    {
      nombre: 'Categoría',
      valor: categoriaFecha[0].categoria,
    },
    {
      nombre: 'Orden',
      valor: categoriaFecha[0].orden,
    },
  ];

  return (
    <>
      <AdminInfo
        titulo={categoriaFecha[0].categoria}
        subtitulo={categoriaFecha[0].fecha}
        campos={campos}
        to="../../.."
      />

      <ListaFases fases={fases} navegarA=".." />
    </>
  );
};

export default PaginaInfoCategoriaFecha;

export async function loader({ params }) {
  const { idCategoriaFecha } = params;

  return {
    categoriaFecha: idCategoriaFecha
      ? await obtenerCategoriaFecha(idCategoriaFecha)
      : null,
    fases: await obtenerFases(idCategoriaFecha),
  };
}
