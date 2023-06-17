import { useLoaderData } from 'react-router-dom';

import FormularioGrupo from '../../../components/Admin/Grupos/FormularioGrupo';

const PaginaNuevoGrupo = () => {
  const { idFase } = useLoaderData();

  return <FormularioGrupo method="POST" id_fase={idFase} />;
};

export default PaginaNuevoGrupo;
