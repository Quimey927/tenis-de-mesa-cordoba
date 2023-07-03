import { useLoaderData } from 'react-router-dom';

import FormularioEliminatoria from '../../../components/Admin/Eliminatorias/FormularioEliminatoria';
import { obtenerEliminatoria } from '../../../api';

const PaginaEditarEliminatoria = () => {
  const { eliminatoria } = useLoaderData();

  return <FormularioEliminatoria method="PUT" eliminatoria={eliminatoria} />;
};

export default PaginaEditarEliminatoria;

export async function loader({ params }) {
  const { idEliminatoria, idFase } = params;

  return {
    eliminatoria: idEliminatoria
      ? await obtenerEliminatoria(idEliminatoria)
      : undefined,
    idFase,
  };
}
