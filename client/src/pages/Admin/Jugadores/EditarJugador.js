import { useLoaderData } from 'react-router-dom';

import FormularioJugador from '../../../components/Admin/Jugadores/FormularioJugador';
import { obtenerJugador, obtenerClubes } from '../../../api';

const PaginaEditarJugador = () => {
  const { jugador, clubes } = useLoaderData();

  return <FormularioJugador method="PUT" jugador={jugador} clubes={clubes} />;
};

export default PaginaEditarJugador;

export async function loader({ params }) {
  const { idJugador } = params;

  return {
    jugador: idJugador ? await obtenerJugador(idJugador) : undefined,
    clubes: await obtenerClubes(),
  };
}
