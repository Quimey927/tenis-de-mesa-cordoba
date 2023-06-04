import { useLoaderData } from 'react-router-dom';

import ListaJugadores from '../../../components/Admin/Jugadores/ListaJugadores';
import { obtenerJugadores } from '../../../api';

const Jugadores = () => {
  const jugadores = useLoaderData();

  return <ListaJugadores jugadores={jugadores} />;
};

export default Jugadores;

export async function loader() {
  return obtenerJugadores();
}
