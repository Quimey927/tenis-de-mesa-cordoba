import { useLoaderData } from 'react-router-dom';

import Vivo from '../../components/Usuario/Vivo/Vivo';

const PaginaVivo = () => {
  const streamActivo = useLoaderData();

  return <Vivo streamActivo={streamActivo} />;
};

export default PaginaVivo;
