import { useLoaderData, useNavigate } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import ListaFases from '../../../components/Admin/Fases/ListaFases';
import PosicionesYPuntajes from '../../../components/Admin/CategoriasFecha/PosicionesYPuntajes';
import { obtenerFechaEnEspañol } from '../../../utils/funcionesSobreFechas';
import {
  obtenerCategoriaFecha,
  obtenerFases,
  obtenerJugadoresDeLaCategoriaFecha,
  obtenerJugadores,
  obtenerCategoriasTorneoPosibles,
} from '../../../api';

const PaginaInfoCategoriaFecha = () => {
  const {
    categoriaFecha,
    fases,
    idFecha,
    idCategoriaFecha,
    jugadoresDeLaCategoriaFecha,
    jugadores,
    categoriasTorneoPosibles,
  } = useLoaderData();

  const navigate = useNavigate();

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

  const controladorRedireccionar = () => {
    navigate(`/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}`);
  };

  return (
    <>
      <AdminInfo
        titulo={categoriaFecha[0].categoria}
        subtitulo={categoriaFecha[0].fecha}
        campos={campos}
        to="../../.."
      />

      <ListaFases
        fases={fases}
        idFecha={idFecha}
        idCategoriaFecha={idCategoriaFecha}
      />

      <PosicionesYPuntajes
        jugadoresDeLaCategoriaFecha={jugadoresDeLaCategoriaFecha}
        categoriaFecha={categoriaFecha}
        idCategoriaFecha={idCategoriaFecha}
        controladorRedireccionar={controladorRedireccionar}
        jugadores={jugadores}
        categoriasTorneoPosibles={categoriasTorneoPosibles}
      />
    </>
  );
};

export default PaginaInfoCategoriaFecha;

export async function loader({ params }) {
  const { idCategoriaFecha, idFecha } = params;

  return {
    categoriaFecha: await obtenerCategoriaFecha(idCategoriaFecha),
    fases: await obtenerFases(idCategoriaFecha),
    idFecha,
    idCategoriaFecha,
    jugadoresDeLaCategoriaFecha: await obtenerJugadoresDeLaCategoriaFecha(
      idCategoriaFecha
    ),
    jugadores: await obtenerJugadores(),
    categoriasTorneoPosibles: await obtenerCategoriasTorneoPosibles(idFecha),
  };
}
