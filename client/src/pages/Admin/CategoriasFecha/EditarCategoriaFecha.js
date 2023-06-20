import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaFecha from '../../../components/Admin/CategoriasFecha/FormularioCategoriaFecha';
import { obtenerCategoriaFecha, obtenerFecha } from '../../../api';

const PaginaEditarCategoriaFecha = () => {
  const { categoriaFecha, fecha } = useLoaderData();

  return (
    <FormularioCategoriaFecha
      method="PUT"
      categoriaFecha={categoriaFecha}
      fecha_inicio={fecha[0].fecha_inicio.substring(0, 10)}
      fecha_finalizacion={fecha[0].fecha_finalizacion.substring(0, 10)}
    />
  );
};

export default PaginaEditarCategoriaFecha;

export async function loader({ params }) {
  const { idFecha, idCategoriaFecha } = params;

  return {
    categoriaFecha: idCategoriaFecha
      ? await obtenerCategoriaFecha(idCategoriaFecha)
      : null,
    fecha: await obtenerFecha(idFecha),
  };
}
