import { useLoaderData } from 'react-router-dom';

import FormularioCategoriaTorneo from '../../../components/Admin/CategoriasTorneo/FormularioCategoriaTorneo';
import { obtenerCategoriaTorneo } from '../../../api';

const PaginaEditarCategoriaTorneo = () => {
  const { categoriaTorneo } = useLoaderData();

  return (
    <FormularioCategoriaTorneo method="PUT" categoriaTorneo={categoriaTorneo} />
  );
};

export default PaginaEditarCategoriaTorneo;

export async function loader({ params }) {
  const { idTorneo, idCategoriaTorneo } = params;

  return {
    categoriaTorneo: idCategoriaTorneo
      ? await obtenerCategoriaTorneo(idCategoriaTorneo)
      : null,
    idTorneo,
  };
}
