import { useLoaderData } from 'react-router-dom';

import ListaCiudades from '../../../components/Admin/Ciudades/ListaCiudades';
import { obtenerCiudades } from '../../../api';

const Ciudades = () => {
  const ciudades = useLoaderData();

  return <ListaCiudades ciudades={ciudades} />;
};

export default Ciudades;

export async function loader() {
  return obtenerCiudades();
}
