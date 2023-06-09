import { useLoaderData } from 'react-router-dom';

import FormularioFecha from '../../../components/Admin/Fechas/FormularioFecha';
import {
  obtenerFecha,
  obtenerTorneos,
  obtenerClubes,
  obtenerFechas,
  obtenerCategoriasFecha,
} from '../../../api';

const PaginaEditarFecha = () => {
  const { fecha, torneos, clubes, fechas, categoriasFecha } = useLoaderData();

  return (
    <FormularioFecha
      method="PUT"
      fecha={fecha}
      torneos={torneos}
      clubes={clubes}
      fechas={fechas}
      categoriasFecha={categoriasFecha}
    />
  );
};

export default PaginaEditarFecha;

export async function loader({ params }) {
  const { idFecha } = params;

  return {
    fecha: idFecha ? await obtenerFecha(idFecha) : undefined,
    torneos: await obtenerTorneos(),
    clubes: await obtenerClubes(),
    fechas: await obtenerFechas(),
    categoriasFecha: await obtenerCategoriasFecha(idFecha),
  };
}
