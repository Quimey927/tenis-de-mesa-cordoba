import { useLoaderData } from 'react-router-dom';

import FormularioClub from '../../../components/Admin/Clubes/FormularioClub';
import { obtenerClub, obtenerCiudades } from '../../../api';

const PaginaEditarClub = () => {
  const { club, ciudades } = useLoaderData();

  return <FormularioClub method="PUT" club={club} ciudades={ciudades} />;
};

export default PaginaEditarClub;

export async function loader({ params }) {
  const { nombreClub } = params;

  return {
    club: nombreClub ? await obtenerClub(nombreClub) : undefined,
    ciudades: await obtenerCiudades(),
  };
}
