import { useLoaderData } from 'react-router-dom';

import FormularioFase from '../../../components/Admin/Fases/FormularioFase';

const PaginaNuevaFase = () => {
  const { idCategoriaFecha } = useLoaderData();

  return <FormularioFase method="POST" idCategoriaFecha={idCategoriaFecha} />;
};

export default PaginaNuevaFase;
