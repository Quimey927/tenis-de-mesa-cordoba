import { useLoaderData, useNavigate } from 'react-router-dom';

import AdminInfo from '../../../components/Admin/AdminInfo/AdminInfo';
import PosicionesYPuntajes from '../../../components/Admin/CategoriasTorneo/PosicionesYPuntajes';
import {
  obtenerCategoriaTorneo,
  obtenerJugadores,
  obtenerJugadoresDeLaCategoriaTorneo,
  obtenerDatosTablaCategoriaTorneo,
} from '../../../api';

const PaginaInfoCategoriaTorneo = () => {
  const {
    idTorneo,
    categoriaTorneo,
    idCategoriaTorneo,
    jugadoresDeLaCategoriaTorneo,
    jugadores,
    datosTablaCategoriaTorneo,
  } = useLoaderData();

  const navigate = useNavigate();

  const campos = [
    {
      nombre: 'Categoría',
      valor: categoriaTorneo[0].categoria,
    },
    {
      nombre: 'Orden',
      valor: categoriaTorneo[0].orden,
    },
  ];

  const controladorRedireccionar = () => {
    navigate(`/admin/torneos/${idTorneo}/categorias/${idCategoriaTorneo}`);
  };

  return (
    <>
      <AdminInfo
        titulo={categoriaTorneo[0].categoria}
        subtitulo={categoriaTorneo[0].fecha}
        campos={campos}
        to="../.."
      />

      <PosicionesYPuntajes
        jugadoresDeLaCategoriaTorneo={jugadoresDeLaCategoriaTorneo}
        idCategoriaTorneo={idCategoriaTorneo}
        controladorRedireccionar={controladorRedireccionar}
        jugadores={jugadores}
        datosTablaCategoriaTorneo={datosTablaCategoriaTorneo}
      />
    </>
  );
};

export default PaginaInfoCategoriaTorneo;

export async function loader({ params }) {
  const { idCategoriaTorneo, idTorneo } = params;

  return {
    idTorneo,
    categoriaTorneo: await obtenerCategoriaTorneo(idCategoriaTorneo),
    idCategoriaTorneo,
    jugadoresDeLaCategoriaTorneo: await obtenerJugadoresDeLaCategoriaTorneo(
      idCategoriaTorneo
    ),
    jugadores: await obtenerJugadores(),
    datosTablaCategoriaTorneo: await obtenerDatosTablaCategoriaTorneo(
      idCategoriaTorneo
    ),
  };
}
