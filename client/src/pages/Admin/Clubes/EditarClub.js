import { useLoaderData } from 'react-router-dom';

import FormularioClub from '../../../components/Admin/Clubes/FormularioClub';
import { obtenerClub, obtenerCiudades } from '../../../api';

const PaginaEditarClub = () => {
  const { club, ciudades } = useLoaderData();

  return <FormularioClub method="PUT" club={club} ciudades={ciudades} />;
};

export default PaginaEditarClub;

export async function loader({ params }) {
  const { idClub } = params;

  return {
    club: idClub ? await obtenerClub(idClub) : undefined,
    ciudades: await obtenerCiudades(),
  };
}
