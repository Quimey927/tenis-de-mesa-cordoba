import { useLoaderData } from 'react-router-dom';

import FormularioEliminatoria from '../../../components/Admin/Eliminatorias/FormularioEliminatoria';

const PaginaNuevaEliminatoria = () => {
  const { idFase } = useLoaderData();

  return <FormularioEliminatoria method="POST" fase_id={idFase} />;
};

export default PaginaNuevaEliminatoria;
