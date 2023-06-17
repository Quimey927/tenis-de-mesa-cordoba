import { useLoaderData } from 'react-router-dom';

import FormularioFase from '../../../components/Admin/Fases/FormularioFase';
import { obtenerFase } from '../../../api';

const PaginaEditarFase = () => {
  const { fase } = useLoaderData();

  return <FormularioFase method="PUT" fase={fase} />;
};

export default PaginaEditarFase;

export async function loader({ params }) {
  const { idFase } = params;

  return {
    fase: idFase ? await obtenerFase(idFase) : undefined,
  };
}
