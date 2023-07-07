import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaFecha from '../../../components/Admin/CategoriasFecha/FormularioCategoriaFecha';

const PaginaNuevaCategoriaFecha = () => {
  const { fecha, categoriasTorneoPosibles } = useLoaderData();

  return (
    <FormularioCategoriaFecha
      method="POST"
      fecha_inicio={fecha[0].fecha_inicio.substring(0, 10)}
      fecha_finalizacion={fecha[0].fecha_finalizacion.substring(0, 10)}
      categoriasTorneoPosibles={categoriasTorneoPosibles}
    />
  );
};

export default PaginaNuevaCategoriaFecha;
