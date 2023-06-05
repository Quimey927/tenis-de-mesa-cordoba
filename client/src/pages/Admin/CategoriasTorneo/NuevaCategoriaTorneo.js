import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaTorneo from '../../../components/Admin/CategoriasTorneo/FormularioCategoriaTorneo';

const PaginaNuevaCategoriaTorneo = () => {
  const { idTorneo } = useLoaderData();

  return <FormularioCategoriaTorneo method="POST" idTorneo={idTorneo} />;
};

export default PaginaNuevaCategoriaTorneo;
