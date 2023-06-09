import { useLoaderData } from 'react-router-dom';

import FormularioFecha from '../../../components/Admin/Fechas/FormularioFecha';
import ListaStreams from '../../../components/Admin/Streams/ListaStreams';
import ListaCategoriasFecha from '../../../components/Admin/CategoriasFecha/ListaCategoriasFecha';
import {
  obtenerFecha,
  obtenerTorneos,
  obtenerClubes,
  obtenerFechas,
  obtenerCategoriasFecha,
  obtenerStreams,
} from '../../../api';

const PaginaEditarFecha = () => {
  const { fecha, torneos, clubes, fechas, categoriasFecha, streams } =
    useLoaderData();

  return (
    <>
      <FormularioFecha
        method="PUT"
        fecha={fecha}
        torneos={torneos}
        clubes={clubes}
        fechas={fechas}
        categoriasFecha={categoriasFecha}
        streams={streams}
      />

      <ListaStreams
        streams={streams}
        navegarA={`/admin/fechas/${fecha[0].id}`}
      />

      <ListaCategoriasFecha
        categoriasFecha={categoriasFecha}
        navegarA={`/admin/fechas/${fecha[0].id}`}
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
    categoriasFecha: idFecha
      ? await obtenerCategoriasFecha(idFecha)
      : undefined,
    streams: idFecha ? await obtenerStreams(idFecha) : undefined,
  };
}
