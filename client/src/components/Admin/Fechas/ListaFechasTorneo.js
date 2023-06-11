import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarFecha } from '../../../api';

const ListaFechasTorneo = ({ fechasTorneo, navegarA, state }) => {
  const navigate = useNavigate();

  const controladorBorrarFecha = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la fecha del torneo?'
    );

    if (continuar) {
      borrarFecha(id);
      navigate(navegarA);
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Fechas del torneo"
        to="../../fechas/nuevo"
        textoInterno="Agregar Fecha"
        state={state}
      />
      <AdminTablaPagina
        array={fechasTorneo}
        controladorBorrarElemento={controladorBorrarFecha}
        encabezadosColumnas={['nombre', 'num_fecha']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="../../fechas/"
        tieneSufijoEditar={false}
      />
    </>
  );
};

export default ListaFechasTorneo;
