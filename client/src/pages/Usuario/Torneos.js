import { useLoaderData } from 'react-router-dom';

import ListaTorneos from '../../components/Usuario/Torneos/ListaTorneos';
import { obtenerTorneos } from '../../api';

const PaginaTorneos = () => {
  const torneos = useLoaderData();

  return <ListaTorneos torneos={torneos} />;
};

export default PaginaTorneos;

export async function loader() {
  return obtenerTorneos();
}
