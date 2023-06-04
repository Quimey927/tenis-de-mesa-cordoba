import { useLoaderData } from 'react-router-dom';

import FormularioCiudad from '../../../components/Admin/Ciudades/FormularioCiudad';
import { obtenerCiudad } from '../../../api';

const PaginaEditarCiudad = () => {
  const { ciudad } = useLoaderData();

  return <FormularioCiudad method="PUT" ciudad={ciudad} />;
};

export default PaginaEditarCiudad;

export async function loader({ params }) {
  const { nombreCiudad } = params;

  return obtenerCiudad(nombreCiudad);
}
