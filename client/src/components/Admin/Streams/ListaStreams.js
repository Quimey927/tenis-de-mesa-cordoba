import { useNavigate } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import AdminTablaPagina from '../AdminTablaPagina/AdminTablaPagina';
import { borrarStream } from '../../../api';

const ListaStreams = ({ streams, navegarA }) => {
  const navigate = useNavigate();

  const controladorBorrarStream = (id) => {
    const continuar = window.confirm(
      '¿Estás seguro de que querés eliminar el stream?'
    );

    if (continuar) {
      borrarStream(id);
      navigate(navegarA);
    }
  };

  return (
    <>
      <AdminTituloPagina
        titulo="Streams"
        to="streams/nuevo"
        textoInterno="Agregar Stream"
      />
      <AdminTablaPagina
        array={streams ? streams : []}
        controladorBorrarElemento={controladorBorrarStream}
        encabezadosColumnas={['orden']}
        mostrarCantidadEntradasYFiltro={false}
        prefijoLinkEditar="streams/"
      />
    </>
  );
};

export default ListaStreams;
