import { useLoaderData } from 'react-router-dom';

import Fecha from '../../components/Usuario/Fecha/Fecha';
import { obtenerFechaPorSlug } from '../../api/index';

const PaginaFecha = () => {
  const fecha = useLoaderData();

  return <Fecha fecha={fecha} />;
};

export default PaginaFecha;

export async function loader({ params }) {
  const { slugFecha } = params;
  return obtenerFechaPorSlug(slugFecha);
}
