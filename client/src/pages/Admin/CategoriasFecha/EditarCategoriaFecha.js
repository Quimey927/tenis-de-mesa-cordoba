import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaFecha from '../../../components/Admin/CategoriasFecha/FormularioCategoriaFecha';
import { obtenerCategoriaFecha } from '../../../api';

const PaginaEditarCategoriaFecha = () => {
  const { categoriaFecha, idFecha } = useLoaderData();

  return (
    <FormularioCategoriaFecha
      method="PUT"
      categoriaFecha={categoriaFecha}
      idFecha={idFecha}
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
    idFecha,
  };
}
