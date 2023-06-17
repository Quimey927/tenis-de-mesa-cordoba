import { useLoaderData } from 'react-router-dom';

import FormularioGrupo from '../../../components/Admin/Grupos/FormularioGrupo';
import { obtenerGrupo } from '../../../api';

const PaginaEditarGrupo = () => {
  const { grupo } = useLoaderData();

  return <FormularioGrupo method="PUT" grupo={grupo} />;
};

export default PaginaEditarGrupo;

export async function loader({ params }) {
  const { idGrupo, idFase } = params;

  return {
    grupo: idGrupo ? await obtenerGrupo(idGrupo) : undefined,
    idFase,
  };
}
