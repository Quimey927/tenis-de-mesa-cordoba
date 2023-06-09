import { useLoaderData } from 'react-router-dom';

import FormularioStream from '../../../components/Admin/Streams/FormularioStream';
import { obtenerStream } from '../../../api';

const PaginaEditarStream = () => {
  const { stream, idFecha } = useLoaderData();

  return <FormularioStream method="PUT" stream={stream} idFecha={idFecha} />;
};

export default PaginaEditarStream;

export async function loader({ params }) {
  const { idFecha, idStream } = params;

  return {
    stream: idStream ? await obtenerStream(idStream) : null,
    idFecha,
  };
}
