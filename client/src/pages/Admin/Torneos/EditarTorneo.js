import { useLoaderData } from 'react-router-dom';

import FormularioTorneo from '../../../components/Admin/Torneos/FormularioTorneo';

import { obtenerTorneo, obtenerTorneos } from '../../../api';

const PaginaEditarTorneo = () => {
  const { torneo, torneos } = useLoaderData();

  return (
    <>
      <FormularioTorneo method="PUT" torneo={torneo} torneos={torneos} />
    </>
  );
};

export default PaginaEditarTorneo;

export async function loader({ params }) {
  const { idTorneo } = params;

  return {
    torneo: idTorneo ? await obtenerTorneo(idTorneo) : null,
    torneos: await obtenerTorneos(),
  };
}
