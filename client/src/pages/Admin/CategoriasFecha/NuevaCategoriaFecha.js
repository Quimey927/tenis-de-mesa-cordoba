import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaFecha from '../../../components/Admin/CategoriasFecha/FormularioCategoriaFecha';

const PaginaNuevaCategoriaFecha = () => {
  const { idFecha } = useLoaderData();

  return <FormularioCategoriaFecha method="POST" idFecha={idFecha} />;
};

export default PaginaNuevaCategoriaFecha;
