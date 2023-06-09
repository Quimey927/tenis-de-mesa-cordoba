import { useLoaderData } from 'react-router-dom';

import FormularioStream from '../../../components/Admin/Streams/FormularioStream';

const PaginaNuevoStream = () => {
  const { idFecha } = useLoaderData();

  return <FormularioStream method="POST" idFecha={idFecha} />;
};

export default PaginaNuevoStream;
