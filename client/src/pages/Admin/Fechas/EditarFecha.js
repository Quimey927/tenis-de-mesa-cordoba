import { useLoaderData } from 'react-router-dom';

import FormularioFecha from '../../../components/Admin/Fechas/FormularioFecha';

import {
  obtenerFecha,
  obtenerTorneos,
  obtenerClubes,
  obtenerFechas,
} from '../../../api';

const PaginaEditarFecha = () => {
  const { fecha, torneos, clubes, fechas } = useLoaderData();

  return (
    <>
      <FormularioFecha
        method="PUT"
        fecha={fecha}
        torneos={torneos}
        clubes={clubes}
        fechas={fechas}
      />
    </>
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
  };
}
