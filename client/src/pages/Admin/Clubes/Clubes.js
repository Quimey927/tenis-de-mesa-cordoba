import { useLoaderData } from 'react-router-dom';

import ListaClubes from '../../../components/Admin/Clubes/ListaClubes';
import { obtenerClubes } from '../../../api';

const Clubes = () => {
  const clubes = useLoaderData();

  return <ListaClubes clubes={clubes} />;
};

export default Clubes;

export async function loader() {
  return obtenerClubes();
}
