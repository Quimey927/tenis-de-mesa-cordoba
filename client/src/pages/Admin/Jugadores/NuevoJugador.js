import { useLoaderData } from 'react-router-dom';

import FormularioJugador from '../../../components/Admin/Jugadores/FormularioJugador';

const PaginaNuevoJugador = () => {
  const { clubes } = useLoaderData();

  return <FormularioJugador method="POST" clubes={clubes} />;
};

export default PaginaNuevoJugador;
