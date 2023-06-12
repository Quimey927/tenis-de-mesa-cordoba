import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarFase } from '../../../api';

const ListaFases = ({ fases, navegarA }) => {
  const navigate = useNavigate();

  const controladorBorrarFase = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar la fase?'
    );

    if (continuar) {
      borrarFase(id);
      navigate(navegarA);
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Fases"
        to="editar/fases/nuevo"
        textoInterno="Agregar Fase"
      />
      <AdminTablaPagina
        array={fases ? fases : []}
        controladorBorrarElemento={controladorBorrarFase}
        encabezadosColumnas={['nombre']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="editar/fases/"
      />
    </>
  );
};

export default ListaFases;
