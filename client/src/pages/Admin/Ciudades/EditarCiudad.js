import { useLoaderData } from 'react-router-dom';

import FormularioCiudad from '../../../components/Admin/Ciudades/FormularioCiudad';
import { obtenerCiudad } from '../../../api';

const PaginaEditarCiudad = () => {
  const { ciudad } = useLoaderData();

  return <FormularioCiudad method="PUT" ciudad={ciudad} />;
};

export default PaginaEditarCiudad;

export async function loader({ params }) {
  const { idCiudad } = params;

  return {
    ciudad: idCiudad ? await obtenerCiudad(idCiudad) : undefined,
  };
}
