import { useLoaderData } from 'react-router-dom';

import FormularioFecha from '../../../components/Admin/Fechas/FormularioFecha';

const PaginaNuevaFecha = () => {
  const { torneos, clubes, fechas } = useLoaderData();

  return (
    <FormularioFecha
      method="POST"
      torneos={torneos}
      clubes={clubes}
      fechas={fechas}
    />
  );
};

export default PaginaNuevaFecha;
