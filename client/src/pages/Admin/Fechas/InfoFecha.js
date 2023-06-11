import { useLoaderData } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaStreams from '../../../components/Admin/Streams/ListaStreams';
import ListaCategoriasFecha from '../../../components/Admin/CategoriasFecha/ListaCategoriasFecha';
import {
  obtenerFecha,
  obtenerCategoriasFecha,
  obtenerStreams,
} from '../../../api';

const PaginaInfoFecha = () => {
  const { fecha, categoriasFecha, streams } = useLoaderData();

  const campos = [
    {
      nombre: 'Nombre',
      valor: fecha[0].nombre,
    },
    {
      nombre: 'Torneo al que pertenece',
      valor: fecha[0].torneo,
    },
    {
      nombre: 'Lugar',
      valor: fecha[0].lugar,
    },
    {
      nombre: 'Fecha de inicio',
      valor:
        fecha[0].fecha_inicio !== null
          ? fecha[0].fecha_inicio.substring(0, 10)
          : '',
    },
    {
      nombre: 'Fecha de finalizacion',
      valor:
        fecha[0].fecha_finalizacion !== null
          ? fecha[0].fecha_finalizacion.substring(0, 10)
          : '',
    },
  ];

  return (
    <>
      <AdminInfo
        titulo={fecha[0].nombre}
        campos={campos}
        imagen={fecha[0].imagen}
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

export default PaginaInfoFecha;

export async function loader({ params }) {
  const { idFecha } = params;

  return {
    fecha: idFecha ? await obtenerFecha(idFecha) : undefined,
    categoriasFecha: idFecha
      ? await obtenerCategoriasFecha(idFecha)
      : undefined,
    streams: idFecha ? await obtenerStreams(idFecha) : undefined,
  };
}
