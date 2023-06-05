import { useLoaderData } from 'react-router-dom';

import FormularioClub from '../../../components/Admin/Clubes/FormularioClub';

const PaginaNuevoClub = () => {
  const { ciudades } = useLoaderData();

  return <FormularioClub method="POST" ciudades={ciudades} />;
};

export default PaginaNuevoClub;
