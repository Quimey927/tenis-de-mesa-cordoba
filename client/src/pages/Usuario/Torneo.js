import { useLoaderData } from 'react-router-dom';

import Torneo from '../../components/Usuario/Torneo/Torneo';
import { obtenerTorneoPorSlug } from '../../api';

const PaginaTorneo = () => {
  const torneo = useLoaderData();

  return <Torneo torneo={torneo} />;
};

export default PaginaTorneo;

export async function loader({ params }) {
  const { slugTorneo } = params;
  return obtenerTorneoPorSlug(slugTorneo);
}
