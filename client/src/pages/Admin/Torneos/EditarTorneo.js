import { useLoaderData } from 'react-router-dom';

import FormularioTorneo from '../../../components/Admin/Torneos/FormularioTorneo';
import {
  obtenerTorneo,
  obtenerTorneos,
  obtenerCategoriasTorneo,
  obtenerFechasTorneo,
} from '../../../api';

const PaginaEditarTorneo = () => {
  const { torneo, torneos, categoriasTorneo, fechasTorneo } = useLoaderData();

  return (
    <FormularioTorneo
      method="PUT"
      torneo={torneo}
      torneos={torneos}
      categoriasTorneo={categoriasTorneo}
      fechasTorneo={fechasTorneo}
    />
  );
};

export default PaginaEditarTorneo;

export async function loader({ params }) {
  const { idTorneo } = params;

  return {
    torneo: idTorneo ? await obtenerTorneo(idTorneo) : null,
    torneos: await obtenerTorneos(),
    categoriasTorneo: idTorneo ? await obtenerCategoriasTorneo(idTorneo) : null,
    fechasTorneo: idTorneo ? await obtenerFechasTorneo(idTorneo) : null,
  };
}
