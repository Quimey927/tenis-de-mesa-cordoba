import { useLoaderData } from 'react-router-dom';

import ListaTorneos from '../../../components/Admin/Torneos/ListaTorneos';
import { obtenerTorneos } from '../../../api';

const Torneos = () => {
  const torneos = useLoaderData();

  return <ListaTorneos torneos={torneos} />;
};

export default Torneos;

export async function loader() {
  return obtenerTorneos();
}
