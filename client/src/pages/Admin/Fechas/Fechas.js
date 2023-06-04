import { useLoaderData } from 'react-router-dom';

import ListaFechas from '../../../components/Admin/Fechas/ListaFechas';
import { obtenerFechas } from '../../../api';

const Fechas = () => {
  const fechas = useLoaderData();

  return <ListaFechas fechas={fechas} />;
};

export default Fechas;

export async function loader() {
  return obtenerFechas();
}
