import { useLoaderData } from 'react-router-dom';

import Jugadores from '../../components/Usuario/Jugadores/Jugadores';
import { obtenerJugadores } from '../../api';

const PaginaJugadores = () => {
  const jugadores = useLoaderData();

  return <Jugadores jugadores={jugadores} />;
};

export default PaginaJugadores;

export async function loader() {
  return obtenerJugadores();
}
