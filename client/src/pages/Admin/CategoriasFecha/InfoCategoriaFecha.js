import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaFases from '../../../components/Admin/Fases/ListaFases';
import { obtenerFechaEnEspañol } from '../../../utils/funcionesSobreFechas';
import { obtenerCategoriaFecha, obtenerFases } from '../../../api';

const PaginaInfoCategoriaFecha = () => {
  const { categoriaFecha, fases, idFecha, idCategoriaFecha } = useLoaderData();

  const campos = [
    {
      nombre: 'Categoría',
      valor: categoriaFecha[0].categoria,
    },
    {
      nombre: 'Orden',
      valor: categoriaFecha[0].orden,
    },
    {
      nombre: 'Día',
      valor: obtenerFechaEnEspañol(categoriaFecha[0].dia.substring(0, 10)),
    },
  ];

  return (
    <>
      <AdminInfo
        titulo={categoriaFecha[0].categoria}
        subtitulo={categoriaFecha[0].fecha}
        campos={campos}
      />

      <ListaFases
        fases={fases}
        idFecha={idFecha}
        idCategoriaFecha={idCategoriaFecha}
      />
    </>
  );
};

export default PaginaInfoCategoriaFecha;

export async function loader({ params }) {
  const { idCategoriaFecha, idFecha } = params;

  return {
    categoriaFecha: idCategoriaFecha
      ? await obtenerCategoriaFecha(idCategoriaFecha)
      : null,
    fases: await obtenerFases(idCategoriaFecha),
    idFecha,
    idCategoriaFecha,
  };
}
