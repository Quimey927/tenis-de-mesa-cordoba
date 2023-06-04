import { useLoaderData } from 'react-router-dom';

import Fechas from '../../components/Usuario/Fechas/Fechas';
import { obtenerFechasDelMes } from '../../api';
import { obtenerDiasDeTorneo } from '../../utils/obtenerDiasDeTorneo';

const PaginaFechas = () => {
  const fechasDelMesActual = useLoaderData();

  return (
    <Fechas
      fechasDelMesActual={fechasDelMesActual}
      diasActualesDeTorneo={obtenerDiasDeTorneo(fechasDelMesActual)}
    />
  );
};

export default PaginaFechas;

export async function loader() {
  const fechaActual = new Date();
  const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const añoActual = fechaActual.getFullYear();

  return obtenerFechasDelMes(mesActual, añoActual);
}
