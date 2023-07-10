import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarFecha } from '../../../api';

const ListaFechas = ({ fechas }) => {
  const navigate = useNavigate();

  const controladorBorrarFecha = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la fecha?'
    );

    if (continuar) {
      borrarFecha(id);
      navigate('/admin/fechas');
    }
  };

  return (
    <>
      <AdminTituloPagina titulo="Fechas" />
      <AdminTablaPagina
        array={fechas}
        controladorBorrarElemento={controladorBorrarFecha}
        encabezadosColumnas={['nombre', 'torneo', 'temporada']}
      />
    </>
  );
};

export default ListaFechas;
