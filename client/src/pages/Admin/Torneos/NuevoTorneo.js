import { useLoaderData } from 'react-router-dom';

import FormularioTorneo from '../../../components/Admin/Torneos/FormularioTorneo';

const PaginaNuevoTorneo = () => {
  const { torneos } = useLoaderData();

  return <FormularioTorneo method="POST" torneos={torneos} />;
};

export default PaginaNuevoTorneo;
